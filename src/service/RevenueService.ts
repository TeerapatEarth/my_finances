import axios, { AxiosResponse } from 'axios';
import url from "../api/api"
import { listDetail } from '@/model/listDetail';
class RevenueService {
    static async addRevenue(payload: listDetail) {
        try {
            const result : AxiosResponse<listDetail> = await axios.post(url.addRevenue, payload)
            return result.data
        } catch (err){
            console.log(err)
            return null
        }
    }
    static async getAllRevenue() {
        try {
            const result : AxiosResponse<listDetail[]> = await axios.get(url.getAllRevenue)
            return result.data
        } catch (err){
            console.log(err)
            return null
        }
    }
}
export default RevenueService;