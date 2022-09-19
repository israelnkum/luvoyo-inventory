import api from '../../utils/api'
import {addExpenses, allExpenses, deleteExpenses, updateExpenses} from "./ActionCreators";

export const handleGetAllExpenses = (pageNumber = 1) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/expenses?page=${pageNumber}`).then((res) => {
            dispatch(allExpenses(res.data))
            resolve(res)
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
