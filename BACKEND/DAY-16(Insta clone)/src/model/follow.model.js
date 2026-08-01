const mongoose = require("mongoose");
const followRecordsSchema = new mongoose.Schema({
    follower:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    },
    followerUsername:{
        type:String,
        require:true,
    },
    followee:{ // the person who is being followed
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    },
     followeeUsername:{
        type:String,
        require:true,
    },

},{
    timestamps:true  // last time update
})
followRecordsSchema.index(
  { follower: 1, followee: 1 },
  { unique: true }
);
const followRecordmodel = mongoose.model("FollowRecords",followRecordsSchema);
module.exports = followRecordmodel;
//  search waht is throwput operations per sec
// 
