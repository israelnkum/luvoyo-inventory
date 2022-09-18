import api from '../../utils/api'
import {addCashUps, allCashUps, deleteCashUps, updateCashUps} from "./ActionCreators";

export const handleGetAllCashUps = () => async (dispatch) => {
    await api().get('/cash-ups')
        .then((res) => {
            dispatch(allCashUps(res.data))
        })
}


export const handleAddNewCashUps = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/cash-ups', values).then((res) => {
            dispatch(addCashUps(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateCashUps = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/cash-ups/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateCashUps(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteCashUps = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/cash-ups/${id}`).then((res) => {
            dispatch(deleteCashUps(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
