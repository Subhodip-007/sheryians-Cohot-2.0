const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    usernmae:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    Password:{
        type:String,
        require:true,


    }
})
const userModel = model("user-collection",userSchema);
export default userModel;