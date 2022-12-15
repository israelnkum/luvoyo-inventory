import { Types } from '../actions/dispatch-orders/Types'
const initialState = {
    dispatchOrders: {
        data: [],
        meta: {}
    },
    dispatchOrder: {}
}

export default function dispatchOrderReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_DISPATCH_ORDERS:
            return { ...state, dispatchOrders: action.payload }

        case Types.GET_DISPATCH_ORDER:
            return { ...state, dispatchOrder: action.payload }

        case Types.ADD_DISPATCH_ORDER:
            return {
                ...state,
                dispatchOrders: { ...state.dispatchOrders, data: state.dispatchOrders.data.concat(action.payload) }
            }

        case Types.UPDATE_DISPATCH_ORDER:
            return {
                ...state,
                dispatchOrders: {
                    ...state.dispatchOrders,
                    data: state.dispatchOrders.data.map((dispatchOrder) => {
                        return dispatchOrder.id === action.payload.id ? action.payload : dispatchOrder
                    })
                }
            }

        case Types.REMOVE_DISPATCH_ORDER:
            return {
                ...state,
                dispatchOrders: { ...state.dispatchOrders, data: state.dispatchOrders.data.filter((dispatchOrder) => dispatchOrder.id !== action.id) }
            }

        default:
            return state
    }
}
