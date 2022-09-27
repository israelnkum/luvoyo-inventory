import { Types } from './Types'


export const allReceivedOrders = (payload) => {
  return {
    type: Types.ALL_RECEIVED_ORDERS,
      payload: payload
  }
}


export const addReceivedOrders = (payload) => {
    return {
        type: Types.ADD_RECEIVED_ORDERS,
        payload: payload
    }
}

export const deleteReceivedOrders = (id) => {
  return {
    type: Types.DELETE_RECEIVED_ORDERS,
      id: id
  }
}

export const updateReceivedOrders = (payload) => {
  return {
    type: Types.UPDATE_RECEIVED_ORDERS,
      payload: payload
  }
}
