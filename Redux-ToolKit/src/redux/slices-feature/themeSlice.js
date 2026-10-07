import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name:'theme',
    initialState:{
        value:'light'
    },
    reducers:{
        setLight:(state)=>{
            state.value = 'light'
        },
        setDark:(state)=>{
            state.value = 'dark'
        }
    }
})
export const {setLight,setDark} = themeSlice.actions
export default themeSlice.reducer