import demoReducer, { DemoSliceState } from './slices/demo'
import authReducer, { AuthState } from './slices/auth'
import { combineReducers } from '@reduxjs/toolkit'
import productReducer, { ProductSliceState } from './slices/product/productSlice'
import customerReducer, { CustomerSliceState } from './slices/customer/customerSlice'
import userReducer, { UserSliceState } from './slices/users/userSlice'

export type RootState = {
    demo: DemoSliceState,
    auth: AuthState,
    product: ProductSliceState,
    customer: CustomerSliceState,
    user: UserSliceState
}

const rootReducer = combineReducers({
    demo: demoReducer,
    auth: authReducer,
    product: productReducer,
    customer: customerReducer,
    user: userReducer
});

export default rootReducer;