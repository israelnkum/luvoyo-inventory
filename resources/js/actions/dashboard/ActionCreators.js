import { Types } from './Types'


export const getDashboardData = (payload) => {
    return {
        type: Types.GET_DASHBOARD_DATA,
        payload: payload
    }
}
