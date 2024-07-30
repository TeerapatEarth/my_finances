import axios, { AxiosResponse } from 'axios';
import url from "../api/api"
import { listDetail } from '@/model/listDetail';
class ExpensesService {
    static async addExpenses(payload: listDetail) {
        try {
            const result : AxiosResponse<listDetail> = await axios.post(url.addExpenses, payload)
            return result.data
        } catch (err){
            console.log(err)
            return null
        }
    }
    static async getAllExpenses() {
        try {
            const result : AxiosResponse<listDetail[]> = await axios.get(url.getAllExpenses)
            return result.data
        } catch (err){
            console.log(err)
            return null
        }
    }
}
export default ExpensesService;