import { Types } from '../actions/commons/Types'
const initialState = {
    suppliers: []
}

export default function commonReducer (state = initialState, action) {
    switch (action.type) {
        case Types.COMMON_SUPPLIERS:
            return { ...state, suppliers: action.payload }
        default:
            return state
    }
}
