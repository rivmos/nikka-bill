import { UserState } from "@/@types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
    loading: boolean,
    user: UserState
}

const initialState: IInitialState = {
    loading: false,
    user: {}
}

const authSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
        }
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;