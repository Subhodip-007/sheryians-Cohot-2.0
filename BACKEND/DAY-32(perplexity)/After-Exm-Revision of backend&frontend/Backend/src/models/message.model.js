import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat-collection",
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','ai'],
        required:true,
    },
   
},{timestamps:true})
export const messageModel = model("message-collection",messageSchema);
