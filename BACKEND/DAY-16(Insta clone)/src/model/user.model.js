const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        unique:[true,"username already exist"],
        required:[true,"user name is required"],
    },
    Email:{
        type:String,
        unique:[true,"Email already exist"],
        required:[true,"Email name is required"],
    },
    Password:{
        type:String,
        required:[true,"Password is required"],
    },
    Bio:{
        type:String,
    },
    ProfileImage:{ // insta has a defaule profile image..
        type: String,
        default:"https://ik.imagekit.io/e30yzaknwc/default%20ing.png"
    }
})
const userModel = mongoose.model("users",userSchema)

module.exports = userModel;