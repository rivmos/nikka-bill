import ApiService from "./ApiService"


export const apiGetTenantUsers = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: `/users/tenant/${data.tenant}`,
        method: 'get',
    })
}