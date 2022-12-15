import api from '../../utils/api'
import {addTrucks, allTrucks, deleteTrucks, updateTrucks} from "./ActionCreators";
import {completeExport} from "../../utils";

export const handleGetAllTrucks = (params) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/trucks?${params}`).then((res) => {
            dispatch(allTrucks(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportTrucks = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/trucks?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Trucks')
                resolve()
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
