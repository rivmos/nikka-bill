import demoReducer, { DemoSliceState } from './slices/demo'
import authReducer, { AuthState } from './slices/auth'
import { combineReducers } from '@reduxjs/toolkit'
import productReducer, { ProductSliceState } from './slices/product/productSlice'
import customerReducer, { CustomerSliceState } from './slices/customer/customerSlice'

export type RootState = {
    demo: DemoSliceState,
    auth: AuthState,
    product: ProductSliceState,
    customer: CustomerSliceState
}

const rootReducer = combineReducers({
    demo: demoReducer,
    auth: authReducer,
    product: productReducer,
    customer: customerReducer
});

export default rootReducer;