import { configureStore } from "@reduxjs/toolkit";
import listRevenueReducer from "./listRevenueReducer";
import listExpensesReducer from "./listExpensesReducer";
import firstRenderReducer from "./firstRenderReducer";
import salaryReducer from "./salaryReducer";
export const store = configureStore({
    reducer: {
        firstRender: firstRenderReducer,
        revenue: listRevenueReducer,
        expenses: listExpensesReducer,
        salary: salaryReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
