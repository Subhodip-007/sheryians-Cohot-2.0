import mongoose from "mongoose";
const BlacklistTokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,

    },
    
})