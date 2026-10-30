import { title } from "framer-motion/client";
import mongoose, { model, Schema } from "mongoose";

const chatSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user-collection",
        required:true,
    },
    title:{
        type:String,
        require:true,
        default:"New chat",
        trim:true,
    }
})
export const chatModel = model("chat-collection",chatSchema);