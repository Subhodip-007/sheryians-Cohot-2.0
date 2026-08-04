const { default: mongoose, Schema, model } = require("mongoose");

const followSchema = new Schema({
    Follower:{
        type:string,
        required:[true]

    },FollowerUsername:{
        type:String,
        required:[true]
    },
    Followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"REV_Insta_clone_users",
        required:[true]
    },
    FolloweeUsername:{
        type:String,
        required:[true]
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    }
})
followSchema.index(
  { followee: 1, follower: 1 },
  { unique: true }
);
const followModel = model("REV_Insta_clone_follow",followSchema);
module.exports = followModel;