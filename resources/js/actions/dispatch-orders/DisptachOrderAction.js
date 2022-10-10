import api from '../../utils/api'
import {addDispatchOrder, getDispatchOrder, getDispatchOrders, removeDispatchOrder, updateDispatchOrder,} from './ActionCreators'
import {completeExport} from "../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddDispatchOrder = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/dispatch-orders', driver).then((res) => {
            dispatch(addDispatchOrder(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllDispatchOrders = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/dispatch-orders?${params}`).then((res) => {
            dispatch(getDispatchOrders(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportDispatchOrders = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/dispatch-orders?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Dispatch-Orders')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleDispatchOrder = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/dispatch-orders/${id}`).then((res) => {
            dispatch(getDispatchOrder(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * Update the specified resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleUpdateDispatchOrder = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/dispatch-orders/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/dispatch-order-data' }
        }).then((res) => {
            dispatch(updateDispatchOrder(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Remove the specified resource from storage.
 * @param id
 * @returns {function(*): Promise<unknown>}
 */
export const handleDeleteDispatchOrder = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/dispatch-orders/${id}`).then((res) => {
            dispatch(removeDispatchOrder(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
