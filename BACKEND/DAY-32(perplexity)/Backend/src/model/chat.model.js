import {Schema , model } from "mongoose";

const chatSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-collection",
        required: true

    },
    title:{
        type: String,
        required: true,
        default: "New Chat",
        trim: true
    },


},{timestamps: true});

export const chatModel = model("chat-collection",chatSchema);
