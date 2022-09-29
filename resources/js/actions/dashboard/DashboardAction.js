import api from '../../utils/api'
import {getDashboardData} from "./ActionCreators";

export const handleGetDashboardData = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/dashboard/').then((res) => {
            dispatch(getDashboardData(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
