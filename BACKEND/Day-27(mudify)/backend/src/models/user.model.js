const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username:{
        type:String,
        require:[true,"username is required"],
        unique:[true,"username already exist "]

    },email:{
        type:String,
         require:[true,"email is required"],
        unique:[true,"email already exist "]

    },password:{
        type:String,
         require:[true,"email is required"],
         select:false

    }

},{timestamps:true})
 const userModel = model("user-data",userSchema);
 module.exports = userModel