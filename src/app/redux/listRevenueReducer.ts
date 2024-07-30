import { listDetail } from "@/model/listDetail"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialState {
    listRevenue: listDetail[]
}

const initialState: InitialState = {
    listRevenue: []
}

export const listRevenueSlice = createSlice({
    name: 'listRevenue',
    initialState,
    reducers: {
        initialRevenue: (state, action: PayloadAction<listDetail[]>) => {
            state.listRevenue = action.payload
        },
        addRevenue: (state, action: PayloadAction<listDetail>) => {
            state.listRevenue = [...state.listRevenue, action.payload]
        }
    }
})

export const { initialRevenue, addRevenue } = listRevenueSlice.actions
export default listRevenueSlice.reducer