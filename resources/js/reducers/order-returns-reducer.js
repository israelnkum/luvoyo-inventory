import { Types } from '../actions/order-returns/Types'
const initialState = {
    returnOrders: {
        data: [],
        meta: {}
    }
}

export default function returnOrdersReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_ORDER_RETURNS:
            return { ...state, returnOrders: action.payload }


        case Types.ADD_ORDER_RETURNS:
            return {
                ...state,
                returnOrders: { ...state.returnOrders, data: state.returnOrders.data.concat(action.payload) }
            }

        case Types.UPDATE_ORDER_RETURNS:
            return {
                ...state,
                returnOrders: {
                    ...state.returnOrders,
                    data: state.returnOrders.data.map((returnOrders) => {
                        return returnOrders.id === action.payload.id ? action.payload : returnOrders
                    })
                }
            }

        case Types.DELETE_ORDER_RETURNS:
            return {
                ...state,
                returnOrders: { ...state.returnOrders, data: state.returnOrders.data.filter((returnOrders) => returnOrders.id !== action.id) }
            }

        default:
            return state
    }
}
