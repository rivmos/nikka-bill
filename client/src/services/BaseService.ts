import { signOutSuccess, store } from "@/store";
import appConfig from "../config/app.config";
import axios from "axios";

const BaseService = axios.create({
    timeout: 30000,
    baseURL: appConfig.baseUrl
})

const unauthorizedCode = [401]

BaseService.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.session.token;
        config.headers.set('Authorization', `Bearer ${accessToken}`);
        return config;
    },
    (error) => {
        return Promise.reject(error)
    })

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess())
        }

        return Promise.reject(error)
    })

export default BaseService;