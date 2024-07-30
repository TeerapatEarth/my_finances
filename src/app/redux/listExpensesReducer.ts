import { listDetail } from "@/model/listDetail"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialState {
    listExpenses: listDetail[]
}

const initialState: InitialState = {
    listExpenses: []
}

export const listExpensesSlice = createSlice({
    name: 'listExpenses',
    initialState,
    reducers: {
        initialExpenses: (state, action: PayloadAction<listDetail[]>) => {
            state.listExpenses = action.payload
        },
        addExpenses: (state, action: PayloadAction<listDetail>) => {
            state.listExpenses = [...state.listExpenses, action.payload]
        }
    }
})

export const { initialExpenses, addExpenses } = listExpensesSlice.actions
export default listExpensesSlice.reducer