const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "REV_Insta_clone_users",
        required: true
    },
    Post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "REV_Insta_clone_postCreate",
        required: true
    }
}, {
    timestamps: true
});
likeSchema.index(
    { user: 1, post: 1 },
    { unique: true }
);
const likeModel = mongoose.model("REV_Insta_Clone_likeModel",likeSchema)
module.exports = likeModel;