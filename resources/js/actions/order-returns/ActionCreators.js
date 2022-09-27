import { Types } from './Types'

export const allOrderReturns = (payload) => {
  return {
    type: Types.ALL_ORDER_RETURNS,
      payload: payload
  }
}

export const addOrderReturns = (payload) => {
    return {
        type: Types.ADD_ORDER_RETURNS,
        payload: payload
    }
}

export const deleteOrderReturns = (id) => {
  return {
    type: Types.DELETE_ORDER_RETURNS,
      id: id
  }
}

export const updateOrderReturns = (payload) => {
  return {
    type: Types.UPDATE_ORDER_RETURNS,
      payload: payload
  }
}
