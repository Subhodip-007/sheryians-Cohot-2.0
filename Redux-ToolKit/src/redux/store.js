import { configureStore } from "@reduxjs/toolkit";
import { wrap } from "framer-motion";
import counterReducer from "./slices-feature/counterSlice"
import themeReducer from "./slices-feature/themeSlice"

// step: 1  configer 
export const store = configureStore({
    reducer:{
        counter:counterReducer,
        theme:themeReducer,


    }
});
// wrap mainjxs using provider 