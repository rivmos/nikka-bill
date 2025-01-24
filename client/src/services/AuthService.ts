import ApiService from "./ApiService"

export const apiSignUp = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: '/sign-up',
        method: 'post',
        data
    })
}

export const apiSignIn = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: '/sign-in',
        method: 'post',
        data
    })
}

export const apiSignOut = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: '/sign-out',
        method: 'post',
        data
    })
}

export const apiUserSignUp = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: '/sign-up/user',
        method: 'post',
        data
    })
}