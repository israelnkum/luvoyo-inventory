import { Types } from './Types'


export const getProducts = (payload) => {
  return {
    type: Types.GET_PRODUCTS,
      payload: payload
  }
}

export const getProduct = (payload) => {
  return {
    type: Types.GET_PRODUCT,
      payload: payload
  }
}

export const addProduct = (payload) => {
    return {
        type: Types.ADD_PRODUCT,
        payload: payload
    }
}

export const removeProduct = (id) => {
  return {
    type: Types.REMOVE_PRODUCT,
      id: id
  }
}

export const updateProduct = (payload) => {
  return {
    type: Types.UPDATE_PRODUCT,
      payload: payload
  }
}
