import { Types } from './Types'


export const allCashUps = (payload) => {
  return {
    type: Types.ALL_CASH_UPS,
      payload: payload
  }
}


export const addCashUps = (payload) => {
    return {
        type: Types.ADD_CASH_UPS,
        payload: payload
    }
}

export const deleteCashUps = (id) => {
  return {
    type: Types.DELETE_CASH_UPS,
      id: id
  }
}

export const updateCashUps = (payload) => {
  return {
    type: Types.UPDATE_CASH_UPS,
      payload: payload
  }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_CASHUP_FILTER,
        payload: payload
    }
}

export const getChartData = (payload) => {
    return {
        type: Types.GET_CHART_DATA,
        payload: payload
    }
}
