import { Types } from './Types'


export const getEmergencyContacts = (payload) => {
  return {
    type: Types.GET_EMERGENCY_CONTACTS,
      payload: payload
  }
}

export const getEmergencyContact = (payload) => {
  return {
    type: Types.GET_EMERGENCY_CONTACT,
      payload: payload
  }
}

export const addEmergencyContact = (payload) => {
    return {
        type: Types.ADD_EMERGENCY_CONTACT,
        payload: payload
    }
}

export const removeEmergencyContact = (id) => {
  return {
    type: Types.REMOVE_EMERGENCY_CONTACT,
      id: id
  }
}

export const updateEmergencyContact = (payload) => {
  return {
    type: Types.UPDATE_EMERGENCY_CONTACT,
      payload: payload
  }
}
