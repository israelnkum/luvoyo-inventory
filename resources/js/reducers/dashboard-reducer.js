import { Types } from '../actions/dashboard/Types'
const initialState = {
    statistics: {}
}

export default function dashboardReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_DASHBOARD_DATA:
            return { ...state, statistics: action.payload }

        default:
            return state
    }
}
