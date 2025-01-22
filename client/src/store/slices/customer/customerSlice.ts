import { CustomerState } from "@/@types/customer";
import { apiAddCustomer, apiGetCustomerByPhone, apiGetTenantCustomers } from "@/services/CustomerService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type CustomerSliceState = {
    loading: boolean,
    list: CustomerState[]
}

const initialState: CustomerSliceState = {
    loading: false,
    list: []
}

export const getTenantCustomers = createAsyncThunk('getTenantCustomers', async (data: { tenant: string }) => {
    const res = await apiGetTenantCustomers<CustomerState[], { tenant: string }>(data);
    return res.data
})

export const getTenantCustomersByPhone = createAsyncThunk('getTenantCustomersByPhone', async (data: { tenant: string, phoneNumber: string }) => {
    const res = await apiGetCustomerByPhone<CustomerState[], { tenant: string, phoneNumber: string }>(data);
    return res.data
})

export const addCustomer = createAsyncThunk('addCustomer', async (data: Partial<CustomerState>) => {
    const res = await apiAddCustomer<CustomerState, Partial<CustomerState>>(data);
    return res.data
})


const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTenantCustomers.pending, (state) => {
                state.loading = true
            })
            .addCase(getTenantCustomers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(getTenantCustomersByPhone.pending, (state) => {
                state.loading = true
            })
            .addCase(getTenantCustomersByPhone.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
    }
})

export const { } = customerSlice.actions;
export default customerSlice.reducer;
