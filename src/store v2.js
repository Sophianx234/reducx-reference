import { applyMiddleware, combineReducers, createStore } from "redux"
import AccountReducer
 from "./features/accounts/accountSlice"
 import { configureStore } from "@reduxjs/toolkit"
 import { thunk } from "redux-thunk"
 import customerReducer from "./features/customers/customerSlice"
import { composeWithDevTools } from "@redux-devtools/extension"
import { configureStore } from "@reduxjs/toolkit"
 

 const rootReducer = combineReducers({
    account: AccountReducer,
    customer: customerReducer 
 })

 const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


 export default  store;