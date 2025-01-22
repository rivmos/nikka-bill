export type AppConfig = {
    baseUrl: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
}

const appConfig: AppConfig = {
    baseUrl: 'http://localhost:9999/',
    authenticatedEntryPath: '/app',
    unAuthenticatedEntryPath: '/signin'
}


export default appConfig
