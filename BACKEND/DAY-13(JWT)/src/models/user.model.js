const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:String,
    // email:String,   // right now if we sent regestration of same email two times it will accept to prevent this
    email:{
        type:String,
        unique:[true,"email already exist.."]
    },
    password:String,


})
const userModel = mongoose.model("usersData",userSchema);

module.exports = userModel;
