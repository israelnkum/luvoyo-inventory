import api from '../../utils/api'
import {addProduct, getProduct, getProducts, removeProduct, updateProduct} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddProduct = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/products', driver).then((res) => {
            dispatch(addProduct(res.data))
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
export const handleGetAllProducts = (pageNumber = 1) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/products?page=${pageNumber}`).then((res) => {
            dispatch(getProducts(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleProduct = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/products/${id}`).then((res) => {
            dispatch(getProduct(res.data))
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
export const handleUpdateProduct = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/products/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/product-data' }
        }).then((res) => {
            dispatch(updateProduct(res.data))
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
export const handleDeleteProduct = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/products/${id}`).then((res) => {
            dispatch(removeProduct(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
