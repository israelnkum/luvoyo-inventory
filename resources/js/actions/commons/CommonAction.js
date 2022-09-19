import api from '../../utils/api'
import {commonEmployees, commonProducts, commonSuppliers} from "./ActionCreators";

export const handleGetCommonSuppliers = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/suppliers?page=0`).then((res) => {
            dispatch(commonSuppliers(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetCommonProducts = (query) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/products/search/${query}`).then((res) => {
            dispatch(commonProducts(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetCommonEmployees = (query) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees/search/${query}`).then((res) => {
            dispatch(commonEmployees(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetCommonTrucks = (query) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/trucks/search/${query}`).then((res) => {
            dispatch(commonEmployees(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
