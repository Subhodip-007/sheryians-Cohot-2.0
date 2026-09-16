import {model, mongoose, Schema} from "mongoose"

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username name should be unique"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email should be unique"]
    },password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    mobileNumber:{
        type:Number,
        required:[true,"mobileNumber is required"],
        
    }
})
export const userModel = model("user-info-collection",userSchema);