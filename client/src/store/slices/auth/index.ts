import { combineReducers } from '@reduxjs/toolkit'
import session, { SessionSliceState } from './sessionSlice'
import user from './userSlice'
import { UserState } from '@/@types/user'

const reducer = combineReducers({
    session,
    user,
})

export type AuthState = {
    session: SessionSliceState
    user: UserState
}

export * from './sessionSlice'
export * from './userSlice'

export default reducer
