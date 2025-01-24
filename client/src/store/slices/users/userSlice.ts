import { UserState } from "@/@types/user";
import { apiGetTenantUsers } from "@/services/UserService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserSliceState = {
    loading: boolean,
    list: UserState[]
}

const initialState: UserSliceState = {
    loading: false,
    list: []
}

export const getTenantUsers = createAsyncThunk('getTenantUsers', async (data: { tenant: string }) => {
    const res = await apiGetTenantUsers<UserState[], { tenant: string }>(data);
    return res.data
})


const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addNewUser: (state, action:PayloadAction<UserState>) => {
            state.list.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTenantUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getTenantUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
    }
})

export const { addNewUser } = userSlice.actions;
export default userSlice.reducer;
