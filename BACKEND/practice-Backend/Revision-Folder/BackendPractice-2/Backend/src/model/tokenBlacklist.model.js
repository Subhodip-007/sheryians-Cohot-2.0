import mongoose from "mongoose";
const BlacklistTokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,

    },
   
},{timestamps:true})

export const BlacklistTokenModel = mongoose.model("BL-Token_collection",BlacklistTokenSchema);

