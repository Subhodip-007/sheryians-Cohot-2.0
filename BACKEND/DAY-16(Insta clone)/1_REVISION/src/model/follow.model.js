const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const followSchema = new Schema({
    Follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "REV_Insta_clone_users",
        required: true
    },

    FollowerUsername: {
        type: String,
        required: true
    },

    Followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "REV_Insta_clone_users",
        required: true
    },

    FolloweeUsername: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected"
        },
        default: "pending"
    },

    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

followSchema.index(
    { Followee: 1, Follower: 1 },
    { unique: true }
);

const followModel = model(
    "REV_Insta_clone_follow",
    followSchema
);

module.exports = followModel;