import ApiService from "./ApiService"

export const apiSignUp = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'post',
        data
    })
}

export const apiSignIn = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'post',
        data
    })
}