const mongoose = require("mongoose");
const userRegestrationSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
})
const userRegestrationModel = mongoose.model("userRegestration DAY-15(auth)",userRegestrationSchema);
 module.exports = userRegestrationModel;