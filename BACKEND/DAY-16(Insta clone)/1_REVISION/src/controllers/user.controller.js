const followModel = require("../model/follow.model");
const userModel = require("../model/users.model");

const followUpController = async (req, res) => {
    try {
        if (!req.verifyUser.id) {
            return res.status(401).json({
                messange: "unauthorized access"
            })
        }
        const followerId = req.verifyUser.id;
        const followeeId = await userModel.findById(req.params.id);
        if (!followeeId) {
            return res.status(404).json({
                messange: "user not found"
            })
        }
        const isrelationExist = await followModel.findOne({
            Followee: followeeId._id,
            Follower: followerId,
        })
        if (isrelationExist) {
            return res.status(409).json({
                messange: "you already follow this user"
            })
        }
        if (followerId === followee._id.toString()) {
            return res.status(400).json({
                message: "You can't follow yourself"
            });
        }
        const followRecord = await followModel.create({
            Followee: followeeId._id,
            FolloweeUsername: followeeId.Username,
            Follower: followerId,
            FollowerUsername: req.verifyUser.username
        })
        res.status(201).json({
            messange: `u started following ${followRecord.FolloweeUsername}`
        })

    } catch (err) {
        res.status(500).json({
            messange: err.message
        })
    }
}
module.exports = followUpController;