import api from '../../utils/api'
import {addBusiness, allBusinesses, deleteBusiness, updateBusiness} from "./ActionCreators";

export const handleGetAllBusiness = () => async (dispatch) => {
  await api().get('/business')
    .then((res) => {
      dispatch(allBusinesses(res.data))
    })
}


export const handleAddNewBusiness = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/business', values).then((res) => {
      dispatch(addBusiness(res.data))
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleUpdateBusiness = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/business/${values.id}`, values).then((res) => {
      dispatch(updateBusiness(res.data))
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleDeleteBusiness = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().delete(`/business/${id}`).then((res) => {
      dispatch(deleteBusiness(id))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
