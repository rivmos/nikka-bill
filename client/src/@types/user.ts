export type UserState = {
    id?: string | null,
    name?: string,
    email?: string,
    permissions?: string[],
    role?: 'super' | 'admin' | 'user' | 'guest',
    tenant?: string
}