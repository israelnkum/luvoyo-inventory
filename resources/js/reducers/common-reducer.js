import { Types } from '../actions/commons/Types'
const initialState = {
    suppliers: [],
    products: [],
}

export default function commonReducer (state = initialState, action) {
    switch (action.type) {
        case Types.COMMON_SUPPLIERS:
            return { ...state, suppliers: action.payload }

        case Types.COMMON_PRODUCTS:
            return { ...state, products: action.payload }

        default:
            return state
    }
}
