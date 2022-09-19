import { Types } from './Types'


export const commonSuppliers = (payload) => {
  return {
    type: Types.COMMON_SUPPLIERS,
      payload: payload
  }
}


export const commonProducts = (payload) => {
  return {
    type: Types.COMMON_PRODUCTS,
      payload: payload
  }
}


export const commonEmployees = (payload) => {
  return {
    type: Types.COMMON_EMPLOYEES,
      payload: payload
  }
}


export const commonTrucks = (payload) => {
  return {
    type: Types.COMMON_TRUCKS,
      payload: payload
  }
}
