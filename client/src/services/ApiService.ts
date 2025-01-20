import { AxiosRequestConfig, AxiosResponse } from "axios"
import BaseService from "./BaseService"

const ApiService = {
    fetchData<Response, Request = Record<string, unknown>>(params: AxiosRequestConfig<Request>) {
        return BaseService(params) as Promise<AxiosResponse<Response>>;
    }
};

export default ApiService;