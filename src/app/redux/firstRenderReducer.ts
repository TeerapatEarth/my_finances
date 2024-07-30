import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialState {
    firstRenderSalary: boolean
}

const initialState: InitialState = {
    firstRenderSalary: false
}

export const firstRenderSlice = createSlice({
    name: 'firstRender',
    initialState,
    reducers: {
        toggleFirstRenderSalary: (state, action: PayloadAction<boolean>) => {
            state.firstRenderSalary = action.payload
        }
    }
})

export const { toggleFirstRenderSalary } = firstRenderSlice.actions
export default firstRenderSlice.reducer