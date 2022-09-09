import api from '../../../utils/api'
import {addEmergencyContact, getEmergencyContact, getEmergencyContacts, removeEmergencyContact, updateEmergencyContact,} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddEmergencyContact = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/employees', driver).then((res) => {
            dispatch(addEmergencyContact(res.data))
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
export const handleGetAllEmergencyContacts = (pageNumber = 1) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees?page=${pageNumber}`).then((res) => {
            dispatch(getEmergencyContacts(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleEmergencyContact = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees/${id}`).then((res) => {
            dispatch(getEmergencyContact(res.data))
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
export const handleUpdateEmergencyContact = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().put(`/employees/${data.id}`, data, {
            // headers: { 'Content-type': 'multipart/employee-data' }
        }).then((res) => {
            dispatch(updateEmergencyContact(res.data))
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
export const handleDeleteEmergencyContact = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/employees/${id}`).then((res) => {
            dispatch(removeEmergencyContact(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
