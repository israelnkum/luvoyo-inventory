import api from '../../utils/api'
import {addReceivedOrders, allReceivedOrders, deleteReceivedOrders, updateReceivedOrders} from "./ActionCreators";

export const handleGetAllReceivedOrders = () => async (dispatch) => {
    await api().get('/received-orders')
        .then((res) => {
            dispatch(allReceivedOrders(res.data))
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
