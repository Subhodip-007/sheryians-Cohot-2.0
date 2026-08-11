const mongoose = require("mongoose");
 const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    img_url:{
        type:String,
        required:[true,"image URL is required for post creation"],

    },
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Must match mongoose.model("users", userSchema)
        required: [true, "User ID is required for creating a post"]
    },

    CreatedAt: {
        type: Date,
        default: Date.now
    }
 })
 const postModel = mongoose.model("instaPOSTcreation",postSchema);

 module.exports = postModel;