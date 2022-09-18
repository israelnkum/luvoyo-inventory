import { Types } from './Types'


export const commonSuppliers = (payload) => {
  return {
    type: Types.COMMON_SUPPLIERS,
      payload: payload
  }
}
