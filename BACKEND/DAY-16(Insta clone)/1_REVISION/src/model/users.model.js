const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"user already exist with this username"]
    },
    Email:{
        type:String,
        required:[true,"Email is required"]
    },
    Password:{
        type:String,
        required:[true,"password is required"]
    },
    Number:{
        type:Number,
        required:[true, "phone number is required"]
    },
    ProfileImage:{
         type: String,
        default:"https://ik.imagekit.io/e30yzaknwc/default%20ing.png"
    },
     otp:{
    type:String,
    otpExpires: Date,
    isVerified: {
        type: Boolean,
        default: false
    }
}
})
const userModel = mongoose.model("REV_Insta_clone_users",userSchema);
module.exports = userModel;