const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    Username:{
        type:String,
        unique:[true,"username should be unique !"],
        required:[true,"username is required !"]
    },
     Email:{
        type:String,
        unique:[true,"Email should be unique !"],
        required:[true,"Email is required !"]
    },
    Password:{
        type:String,
        required:[true,"Password is required !"],
        select:false
    }
})
const userModel = model("user-data-collection",userSchema)
module.exports = userModel;