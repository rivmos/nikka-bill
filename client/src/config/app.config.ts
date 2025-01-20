export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
}

const appConfig: AppConfig = {
    apiPrefix: 'http://127.0.0.1:8000/api',
    authenticatedEntryPath: '/app/projects/projectdashboard',
    unAuthenticatedEntryPath: '/web/home'
}


export default appConfig
