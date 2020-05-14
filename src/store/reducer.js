/**
 * Root Reducer
 */
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from "../components/modules/counter/counterSlice";


const rootReducer = combineReducers({
    counter: counterReducer
})

export default rootReducer;