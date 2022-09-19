import api from '../../utils/api'
import {addTrucks, allTrucks, deleteTrucks, updateTrucks} from "./ActionCreators";

export const handleGetAllTrucks = (pageNumber = 1) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/trucks?page=${pageNumber}`).then((res) => {
            dispatch(allTrucks(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAddNewTrucks = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/trucks', values).then((res) => {
            dispatch(addTrucks(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateTrucks = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/trucks/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateTrucks(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteTrucks = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/trucks/${id}`).then((res) => {
            dispatch(deleteTrucks(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
