import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionSliceState {
    signedIn: boolean;
    token: string | null;
}

const initialState: SessionSliceState = {
    signedIn: false,
    token: null
}

const authSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
    }
})

export const { signInSuccess, signOutSuccess } = authSlice.actions;

export default authSlice.reducer;