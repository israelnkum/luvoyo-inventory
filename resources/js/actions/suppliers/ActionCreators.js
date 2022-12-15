import { Types } from './Types'


export const allSuppliers = (payload) => {
  return {
    type: Types.ALL_SUPPLIERS,
      payload: payload
  }
}


export const addSuppliers = (payload) => {
    return {
        type: Types.ADD_SUPPLIERS,
        payload: payload
    }
}

export const deleteSuppliers = (id) => {
  return {
    type: Types.DELETE_SUPPLIERS,
      id: id
  }
}

export const updateSuppliers = (payload) => {
  return {
    type: Types.UPDATE_SUPPLIERS,
      payload: payload
  }
}
