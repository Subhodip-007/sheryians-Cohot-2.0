const followModel = require("../model/follow.model");
const userModel = require("../model/users.model");

const followUpController = async (req, res) => {
    try {

        if (!req.verifyUser) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const followerId = req.verifyUser.id;

        const followee = await userModel.findById(req.params.id);

        if (!followee) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Prevent following yourself
        if (followerId === followee._id.toString()) {
            return res.status(400).json({
                message: "You can't follow yourself"
            });
        }

        // Check existing relationship
        const isRelationExist = await followModel.findOne({
            Followee: followee._id,
            Follower: followerId
        });

        if (isRelationExist) {
            return res.status(409).json({
                message: "You already follow this user"
            });
        }

        const followRecord = await followModel.create({
            Followee: followee._id,
            FolloweeUsername: followee.Username,
            Follower: followerId,
            FollowerUsername: req.verifyUser.username
        });

        return res.status(201).json({
            message: `You started following ${followRecord.FolloweeUsername}`
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
const GetAllRequest = async (req, res) => {
    try {
        if (!req.verifyUser?.id) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const AllRequest = await followModel
            .find({
                Followee: req.verifyUser.id,
                status: "pending"
            })
            .populate("Follower", "Username");

        if (AllRequest.length === 0) {
            return res.status(200).json({
                message: "No request fetched!"
            });
        }

        return res.status(200).json({
            message: "All follow requests fetched!",
            AllRequest
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
const RequestacceptController = async (req,res)=>{
    try {
        const requestId = req.params.requestid
        const acceptedreq = await followRecordmodel.findById(requestId);
        if (!acceptedreq) {
            return res.status(404).json({
                message: "Request not found",

            })
        }
        if (acceptedreq.followee.toString() !== req.verifiedUser.id) {
            return res.status(403).json({
                message: "You are not authorized to accept this request."
            });
        }

        if (acceptedreq.status !== "Pending") {
            return res.status(400).json({
                message: `Request is already ${acceptedreq.status}.`
            });
        }
        acceptedreq.status = "accepted"
        await acceptedreq.save();
        res.status(200).json({
            message: "Request accepted",
            acceptedreq
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports = {followUpController,
                    GetAllRequest,
                    RequestacceptController

};