import { Types } from '../actions/cashUps/Types'
const initialState = {
    cashUps: {
        data: [],
        meta: {}
    },
    filter: {
        date: '',
    },
    chart: {
        labels: [],
        series: [],
    }
}

export default function cashUpsReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_CASH_UPS:
            return { ...state, cashUps: action.payload }

        case Types.GET_CHART_DATA:
            return { ...state, chart: action.payload }

        case Types.ADD_CASHUP_FILTER:
            return { ...state, filter: action.payload}

        case Types.ADD_CASH_UPS:
            return {
                ...state,
                cashUps: { ...state.cashUps, data: state.cashUps.data.concat(action.payload) }
            }

        case Types.UPDATE_CASH_UPS:
            return {
                ...state,
                cashUps: {
                    ...state.cashUps,
                    data: state.cashUps.data.map((cashUps) => {
                        return cashUps.id === action.payload.id ? action.payload : cashUps
                    })
                }
            }

        case Types.DELETE_CASH_UPS:
            return {
                ...state,
                cashUps: { ...state.cashUps, data: state.cashUps.data.filter((cashUps) => cashUps.id !== action.id) }
            }

        default:
            return state
    }
}
