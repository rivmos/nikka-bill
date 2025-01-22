import { UserState } from "@/@types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    id: null,
    name:'',
    email:'',
    permissions:[],
    role:'guest',
}

const authSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id,
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.permissions = action.payload.permissions;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.tenant = action.payload.tenant;
        }
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;