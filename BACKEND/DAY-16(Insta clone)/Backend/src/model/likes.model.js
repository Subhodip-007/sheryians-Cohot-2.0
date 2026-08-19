const mongoose  = require("mongoose");
const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"instaPOSTcreation"
        ,required:[true,"post id is required for like"]
    },
    username:{
        type:String,
        required:[true,"username is required"]
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userId is required"]
    },
    
       
    

},{
     timestamps:true
})
likeSchema.index({post:1,userID:1},{unique:true})
 const likeModel = mongoose.model("likerecords",likeSchema);

 module.exports = likeModel;  