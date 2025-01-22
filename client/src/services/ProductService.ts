import ApiService from "./ApiService"

export const apiAddProduct = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: '/products',
        method: 'post',
        data
    })
}

export const apiGetTenantProducts = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: `/products/tenant/${data.tenant}`,
        method: 'get',
    })
}