import { Types } from '../actions/products/Types'
const initialState = {
    products: {
        data: [],
        meta: {}
    },
    product: {},
    filter: {},
}

export default function productReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_PRODUCTS:
            return { ...state, products: action.payload }

        case Types.GET_PRODUCT:
            return { ...state, product: action.payload }

        case Types.ADD_PRODUCT:
            return {
                ...state,
                products: { ...state.products, data: state.products.data.concat(action.payload) }
            }

        case Types.UPDATE_PRODUCT:
            return {
                ...state,
                products: {
                    ...state.products,
                    data: state.products.data.map((product) => {
                        return product.id === action.payload.id ? action.payload : product
                    })
                }
            }

        case Types.REMOVE_PRODUCT:
            return {
                ...state,
                products: { ...state.products, data: state.products.data.filter((product) => product.id !== action.id) }
            }

        default:
            return state
    }
}
