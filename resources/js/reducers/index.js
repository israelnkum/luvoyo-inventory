import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import employeeReducer from './employee-reducer'
import userReducer from './UserReducer'
import expensesReducer from "./expenses-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'employeeReducer',
        'userReducer',
        'expensesReducer',
    ]
}

const rootReducer = combineReducers({
    employeeReducer,
    userReducer,
    expensesReducer,
})

export default persistReducer(persistConfig, rootReducer)
