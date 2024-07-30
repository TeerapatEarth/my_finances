import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialState {
    salary: number
}

const initialState: InitialState = {
    salary: 0
}

export const salarySlice = createSlice({
    name: 'salary',
    initialState,
    reducers: {
        setSalary: (state, action: PayloadAction<number>) => {
            state.salary = action.payload
        }
    }
})

export const { setSalary } = salarySlice.actions
export default salarySlice.reducer