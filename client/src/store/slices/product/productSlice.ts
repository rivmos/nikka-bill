import { ProductState } from "@/@types/product";
import { apiAddProduct, apiGetTenantProducts } from "@/services/ProductService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ProductSliceState = {
    loading: boolean,
    list: ProductState[]
}

const initialState: ProductSliceState = {
    loading: false,
    list: []
}

export const getTenantProducts = createAsyncThunk('getTenantProducts', async (data: { tenant: string }) => {
    const res = await apiGetTenantProducts<ProductState[], { tenant: string }>(data);
    return res.data
})

export const addProduct = createAsyncThunk('addProduct', async (data: Partial<ProductState>) => {
    const res = await apiAddProduct<ProductState, Partial<ProductState>>(data);
    return res.data
})


const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTenantProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getTenantProducts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
    }
})

export const { } = productSlice.actions;
export default productSlice.reducer;
