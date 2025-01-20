import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
    loading: boolean,
}

const initialState: IInitialState = {
    loading: false,
}

const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {

    }
})

export const {  } = demoSlice.actions;

export default demoSlice.reducer;