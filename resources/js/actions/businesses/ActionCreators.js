import { Types } from './Types'


export const allBusinesses = (payload) => {
  return {
    type: Types.ALL_BUSINESSES,
      payload: payload
  }
}


export const addBusiness = (payload) => {
    return {
        type: Types.ADD_BUSINESS,
        payload: payload
    }
}

export const deleteBusiness = (id) => {
  return {
    type: Types.DELETE_BUSINESS,
      id: id
  }
}

export const updateBusiness = (payload) => {
  return {
    type: Types.UPDATE_BUSINESS,
      payload: payload
  }
}
