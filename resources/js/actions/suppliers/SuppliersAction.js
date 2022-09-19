import api from '../../utils/api'
import {addSuppliers, allSuppliers, deleteSuppliers, updateSuppliers} from "./ActionCreators";

export const handleGetAllSuppliers = (pageNumber = 1) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/suppliers?page=${pageNumber}`).then((res) => {
            dispatch(allSuppliers(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const handleAddNewSuppliers = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/suppliers', values).then((res) => {
            dispatch(addSuppliers(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateSuppliers = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/suppliers/${values.get('id')}`, values)
            .then((res) => {
                dispatch(updateSuppliers(res.data))
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteSuppliers = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/suppliers/${id}`).then((res) => {
            dispatch(deleteSuppliers(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
