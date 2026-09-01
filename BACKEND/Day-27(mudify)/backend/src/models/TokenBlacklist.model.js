const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
    token:{
        type:String,
        require:[true,"token is required !"],
        unique:true
    }
},{
    timestamps:true
})
const tokenModel = model("token-blacklist",tokenSchema);

module.exports = tokenModel