import { Types } from '../actions/receivedOrders/Types'
const initialState = {
    receivedOrders: {
        data: [],
        meta: {}
    }
}

export default function receivedOrdersReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_RECEIVED_ORDERS:
            return { ...state, receivedOrders: action.payload }


        case Types.ADD_RECEIVED_ORDERS:
            return {
                ...state,
                receivedOrders: { ...state.receivedOrders, data: state.receivedOrders.data.concat(action.payload) }
            }

        case Types.UPDATE_RECEIVED_ORDERS:
            return {
                ...state,
                receivedOrders: {
                    ...state.receivedOrders,
                    data: state.receivedOrders.data.map((receivedOrders) => {
                        return receivedOrders.id === action.payload.id ? action.payload : receivedOrders
                    })
                }
            }

        case Types.DELETE_RECEIVED_ORDERS:
            return {
                ...state,
                receivedOrders: { ...state.receivedOrders, data: state.receivedOrders.data.filter((receivedOrders) => receivedOrders.id !== action.id) }
            }

        default:
            return state
    }
}
