import { Types } from './Types'


export const getEmployees = (payload) => {
  return {
    type: Types.GET_EMPLOYEES,
      payload: payload
  }
}

export const getEmployee = (payload) => {
  return {
    type: Types.GET_EMPLOYEE,
      payload: payload
  }
}

export const addEmployee = (payload) => {
    return {
        type: Types.ADD_EMPLOYEE,
        payload: payload
    }
}

export const removeEmployee = (id) => {
  return {
    type: Types.REMOVE_EMPLOYEE,
      id: id
  }
}

export const updateEmployee = (payload) => {
  return {
    type: Types.UPDATE_EMPLOYEE,
      payload: payload
  }
}
