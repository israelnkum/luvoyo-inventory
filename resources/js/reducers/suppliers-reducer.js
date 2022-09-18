import { Types } from '../actions/suppliers/Types'
const initialState = {
    suppliers: {
        data: [],
        meta: {}
    }
}

export default function suppliersReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_SUPPLIERS:
            return { ...state, suppliers: action.payload }


        case Types.ADD_SUPPLIERS:
            return {
                ...state,
                suppliers: { ...state.suppliers, data: state.suppliers.data.concat(action.payload) }
            }

        case Types.UPDATE_SUPPLIERS:
            return {
                ...state,
                suppliers: {
                    ...state.suppliers,
                    data: state.suppliers.data.map((suppliers) => {
                        return suppliers.id === action.payload.id ? action.payload : suppliers
                    })
                }
            }

        case Types.DELETE_SUPPLIERS:
            return {
                ...state,
                suppliers: { ...state.suppliers, data: state.suppliers.data.filter((suppliers) => suppliers.id !== action.id) }
            }

        default:
            return state
    }
}
