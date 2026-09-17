import {model , Schema} from "mongoose";

const userSchema = Schema({
    username:{
        type: string,
        required:true,
        unique:true,
    },
    email:{
        type: string,
        required:true,
        unique:true,
    },
    password:{
        type: string,
        required:true,
    },
    verified:{
        type: boolean,
        default:false,
    }

},{timestamps: true});

export const userModel = model("user-collection",userSchema);