import api from '../../utils/api'
import {addEmployee, getEmployee, getEmployees, removeEmployee, updateEmployee,} from './ActionCreators'
import {completeExport} from "../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddEmployee = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/employees', driver).then((res) => {
            dispatch(addEmployee(res.data))
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
export const handleGetAllEmployees = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees?${params}`).then((res) => {
            dispatch(getEmployees(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportEmployees = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/employees?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Employees')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleEmployee = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees/${id}`).then((res) => {
            dispatch(getEmployee(res.data))
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
export const handleUpdateEmployee = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/employees/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/employee-data' }
        }).then((res) => {
            dispatch(updateEmployee(res.data))
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
export const handleDeleteEmployee = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/employees/${id}`).then((res) => {
            dispatch(removeEmployee(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
