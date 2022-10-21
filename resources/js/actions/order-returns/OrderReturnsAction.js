import api from '../../utils/api'
import {addOrderReturns, allOrderReturns, deleteOrderReturns, updateOrderReturns} from "./ActionCreators";

export const handleGetAllOrderReturns = (id) => async (dispatch) => {
    await api().get(`/order-returns/${id}`)
        .then((res) => {
            dispatch(allOrderReturns(res.data))
        })
}


export const handleAddNewOrderReturns = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/order-returns', values).then((res) => {
            dispatch(addOrderReturns(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateOrderReturns = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/order-returns/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateOrderReturns(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteOrderReturns = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/order-returns/${id}`).then((res) => {
            dispatch(deleteOrderReturns(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
