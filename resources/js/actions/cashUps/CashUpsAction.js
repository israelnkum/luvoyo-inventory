import api from '../../utils/api'
import {addCashUps, addFilter, allCashUps, deleteCashUps, updateCashUps} from "./ActionCreators";
import {completeExport} from "../../utils";

export const handleGetAllCashUps = (params) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/cash-ups?${params}`).then((res) => {
            dispatch(allCashUps(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportCashUps = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/cash-ups?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Cash-ups')
                resolve()
            }).catch((err) => {
            reject(err)
        })
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
