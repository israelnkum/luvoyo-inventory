import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import employeeReducer from './employee-reducer'
import userReducer from './UserReducer'
import expensesReducer from "./expenses-reducer";
import suppliersReducer from "./suppliers-reducer";
import trucksReducer from "./trucks-reducer";
import cashUpsReducer from "./cashup-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'employeeReducer',
        'userReducer',
        'expensesReducer',
        'suppliersReducer',
        'trucksReducer',
        'cashUpsReducer',
    ]
}

const rootReducer = combineReducers({
    employeeReducer,
    userReducer,
    expensesReducer,
    suppliersReducer,
    trucksReducer,
    cashUpsReducer,
})

export default persistReducer(persistConfig, rootReducer)
