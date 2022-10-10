import api from '../../utils/api'
import {addReceivedOrders, allReceivedOrders, deleteReceivedOrders, updateReceivedOrders} from "./ActionCreators";
import {completeExport} from "../../utils";

export const handleGetAllReceivedOrders = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/received-orders?${params}`).then((res) => {
            dispatch(allReceivedOrders(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const handleExportReceivedOrders = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/received-orders?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Received-Orders')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAddNewReceivedOrders = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/received-orders', values).then((res) => {
            dispatch(addReceivedOrders(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateReceivedOrders = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/received-orders/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateReceivedOrders(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteReceivedOrders = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/received-orders/${id}`).then((res) => {
            dispatch(deleteReceivedOrders(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
