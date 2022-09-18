import { Types } from './Types'


export const getDispatchOrders = (payload) => {
  return {
    type: Types.GET_DISPATCH_ORDERS,
      payload: payload
  }
}

export const getDispatchOrder = (payload) => {
  return {
    type: Types.GET_DISPATCH_ORDER,
      payload: payload
  }
}

export const addDispatchOrder = (payload) => {
    return {
        type: Types.ADD_DISPATCH_ORDER,
        payload: payload
    }
}

export const removeDispatchOrder = (id) => {
  return {
    type: Types.REMOVE_DISPATCH_ORDER,
      id: id
  }
}

export const updateDispatchOrder = (payload) => {
  return {
    type: Types.UPDATE_DISPATCH_ORDER,
      payload: payload
  }
}
