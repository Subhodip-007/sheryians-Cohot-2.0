import { title } from "framer-motion/client";
import mongoose, { Schema } from "mongoose";
const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false
    },
   

    
},{timestamps:true})

export const notesModel = mongoose.model("notes-collection",notesSchema);