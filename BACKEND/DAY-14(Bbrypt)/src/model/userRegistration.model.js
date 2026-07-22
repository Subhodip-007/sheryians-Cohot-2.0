const mongoose = require("mongoose");
const userRegisterSchema = new mongoose.Schema({
    username:{
        require:true,
        type:String,
    },
    email:{
        type:String,
        unique: [true, "This email already exists"],
        require:true,
    },
    password:{
        type:String,
        require:true,

    }
})

const userDataModel = mongoose.model("DAY_14 AUTHbcrypt",userRegisterSchema);

module.exports = userDataModel;