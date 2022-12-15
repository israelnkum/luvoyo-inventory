import api from '../../utils/api'
import {addExpenses, addFilter, allExpenses, deleteExpenses, getChartData, updateExpenses} from "./ActionCreators";
import {completeExport} from "../../utils";

export const handleGetAllExpenses = (params) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/expenses?${params}`).then((res) => {
            dispatch(allExpenses(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportExpenses = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/expenses?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Expenses')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAddNewExpenses = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/expenses', values).then((res) => {
            dispatch(addExpenses(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateExpenses = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().put(`/expenses/${values.id}`, values).then((res) => {
            dispatch(updateExpenses(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetChartData = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('expenses/chart', data).then((res) => {
            dispatch(getChartData(res.data))
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteExpenses = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/expenses/${id}`).then((res) => {
            dispatch(deleteExpenses(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
