import { Types } from '../actions/businesses/Types'
const initialState = {
    businesses: {
        data: [],
        meta: {}
    },
    businessDetail: {}
}

export default function businessReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_BUSINESSES:
            return { ...state, businesses: action.payload }

        case Types.GET_BUSINESS_DETAIL:
            return { ...state, businessDetail: action.payload }

        case Types.ADD_BUSINESS:
            return {
                ...state,
                businesses: { ...state.businesses, data: state.businesses.data.concat(action.payload) }
            }

        case Types.UPDATE_BUSINESS:
            return {
                ...state,
                businesses: {
                    ...state.businesses,
                    data: state.businesses.data.map((business) => {
                        return business.id === action.payload.id ? action.payload : business
                    })
                }
            }

        case Types.DELETE_BUSINESS:
            return {
                ...state,
                businesses: { ...state.businesses, data: state.businesses.data.filter((business) => business.id !== action.id) }
            }

        default:
            return state
    }
}
