import { spring } from "framer-motion";
import { model, Schema } from "mongoose";

const userScheme =  new Schema(
    {
        username:{
        type:String,
        required:true,
        unique:true,
        },
        emali:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,

        },
        verified:{
            type:Boolean,
            default:false,
        }
    },
    {timestamps:true}
);

export const userModel = model("user-collection",userScheme)