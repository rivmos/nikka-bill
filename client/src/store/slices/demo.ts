import { createSlice } from "@reduxjs/toolkit";

export interface DemoSliceState {
    loading: boolean,
}

const initialState: DemoSliceState = {
    loading: false,
}

const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {

    }
})

export const { } = demoSlice.actions;

export default demoSlice.reducer;