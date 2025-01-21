export type UserState = {
    name?: string,
    email?: string,
    permissions?: string[],
    role?: 'super' | 'admin' | 'user',
    tenant?: string
}