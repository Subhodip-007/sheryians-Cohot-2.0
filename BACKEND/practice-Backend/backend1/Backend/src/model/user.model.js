const { Schema, model } = require("mongoose");

const userSchema = Schema({
    Username:{
        type:String,
        require:true,
        unique: true
    },
    Email:{
        type:String,
        require:[true,"email is required for regestation"],
        unique: true
    },
    Password:{
        type:String,
        require:[true,"email is required for regestation"]
    
    }
    
})
const userModel = model("practice1User",userSchema);
module.exports = userModel;