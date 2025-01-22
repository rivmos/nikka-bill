import demoReducer, { DemoSliceState } from './slices/demo'
import authReducer, { AuthState } from './slices/auth'
import { combineReducers } from '@reduxjs/toolkit'
import productSlice, { ProductSliceState } from './slices/product/productSlice'

export type RootState = {
    demo: DemoSliceState,
    auth: AuthState,
    product: ProductSliceState
}

const rootReducer = combineReducers({
    demo: demoReducer,
    auth: authReducer,
    product: productSlice
});

export default rootReducer;