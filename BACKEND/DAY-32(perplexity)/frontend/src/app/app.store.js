import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice"
// different feature have different state 
// this is center point to access all states 
export const store = configureStore({
    reducer:{
        auth:authReducer,
    }
})