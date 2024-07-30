import { addExpenses } from "@/app/redux/listExpensesReducer"

const BASE_URL = 'http://localhost:3001'
const api = {
    addRevenue: `${BASE_URL}/addRevenue`,
    addExpenses: `${BASE_URL}/addExpenses`,
    getAllRevenue: `${BASE_URL}/revenues`,
    getAllExpenses: `${BASE_URL}/expenseses`
}

export default api