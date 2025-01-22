import ApiService from "./ApiService"

export const apiAddCustomer = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: '/customers',
        method: 'post',
        data
    })
}

export const apiGetTenantCustomers = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: `/customers/tenant/${data.tenant}`,
        method: 'get',
    })
}

export const apiGetCustomerByPhone = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        url: `/customers/phone/${data.phoneNumber}`,
        method: 'get',
        params: {
            tenant: data.tenant
        }
    })
}