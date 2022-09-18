import { Types } from '../actions/trucks/Types'
const initialState = {
    trucks: {
        data: [],
        meta: {}
    }
}

export default function trucksReducer (state = initialState, action) {
    switch (action.type) {
        case Types.ALL_TRUCKS:
            return { ...state, trucks: action.payload }


        case Types.ADD_TRUCKS:
            return {
                ...state,
                trucks: { ...state.trucks, data: state.trucks.data.concat(action.payload) }
            }

        case Types.UPDATE_TRUCKS:
            return {
                ...state,
                trucks: {
                    ...state.trucks,
                    data: state.trucks.data.map((trucks) => {
                        return trucks.id === action.payload.id ? action.payload : trucks
                    })
                }
            }

        case Types.DELETE_TRUCKS:
            return {
                ...state,
                trucks: { ...state.trucks, data: state.trucks.data.filter((trucks) => trucks.id !== action.id) }
            }

        default:
            return state
    }
}
