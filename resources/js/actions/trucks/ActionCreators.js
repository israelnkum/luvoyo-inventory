import { Types } from './Types'


export const allTrucks = (payload) => {
  return {
    type: Types.ALL_TRUCKS,
      payload: payload
  }
}


export const addTrucks = (payload) => {
    return {
        type: Types.ADD_TRUCKS,
        payload: payload
    }
}

export const deleteTrucks = (id) => {
  return {
    type: Types.DELETE_TRUCKS,
      id: id
  }
}

export const updateTrucks = (payload) => {
  return {
    type: Types.UPDATE_TRUCKS,
      payload: payload
  }
}
