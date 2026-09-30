import { configureStore } from "@reduxjs/toolkit";
// different feature have different state 
// this is center point to access all states 
export const store = configureStore({
    reducer:{}
})