const Mongoose = require("mongoose");

const postCreateSchema = new Mongoose.Schema({
    Caption:{
        type:String,
        default:""
    },
    ImgSrc:{
        type:String,
        requrired:[true,"image is requresd for creating a post"]
    },
    User_ID:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"REV_Insta_clone_users",
        requrired:[true,"userID is required for post creation"]
    },
     
       CreatedAt: {
        type: Date,
        default: Date.now
    }
   
})

const postCreateModel = Mongoose.model("REV_Insta_clone_postCreate",postCreateSchema);
module.exports = postCreateModel;