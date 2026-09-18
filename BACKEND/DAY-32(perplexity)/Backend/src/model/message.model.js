import mongoose, { Schema,model } from "mongoose"
const messageSchema = new Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat-collection",
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    role:{
        type:string,
        enum:['user','ai'],
        required:true,
    }
},{timestamps:true})

export const chatModel = model("message-collection",messageSchema)