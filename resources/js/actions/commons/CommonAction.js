import api from '../../utils/api'
import {commonSuppliers} from "./ActionCreators";

export const handleGetCommonSuppliers = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/suppliers?page=0`).then((res) => {
            dispatch(commonSuppliers(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
