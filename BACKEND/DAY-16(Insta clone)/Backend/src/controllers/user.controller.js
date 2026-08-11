const followRecordmodel = require("../model/follow.model");
const userModel = require("../model/user.model");

const FollowUpController = async (req, res) => {
    try {
        const followeeUsername = await userModel.findOne({ Username: req.params.username });
        const followerUsername = req.verifiedUser.username;
        // console.log(followeeUsername,followerUsername);
        if (!followeeUsername) {
            return res.status(404).json({
                message: "user with this username dont exist"
            })
        }
        if (followeeUsername.Username === followerUsername) {
            return res.status(409).json({
                message: "u cant follow yourself !"
            })
        }
        const alreadyFollowing = await followRecordmodel.findOne({
            followerUsername,
            followeeUsername: followeeUsername.Username

        });

        if (alreadyFollowing) {
            return res.status(409).json({
                message: `Follow request already exists with status: ${alreadyFollowing.status}`
            });
        }
        const followRequest = await followRecordmodel.create({
            follower: req.verifiedUser.id,
            followerUsername: followerUsername,
            followee: followeeUsername._id,
            followeeUsername: followeeUsername.Username

        })
        res.status(200).json({
            message: "Follow request sent successfully.",
            followRequest
        })


    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}
const UnfollowController = async (req, res) => {
    try {
        const followeeUsername = await userModel.findOne({ Username: req.params.username });
        const followerUsername = req.verifiedUser.username;
        const alreadyFollowing = await followRecordmodel.findOne({
            followerUsername,
            followeeUsername: followeeUsername.Username

        });
        if (!alreadyFollowing) {
            return res.status(409).json({
                message: "u already dont follow this person"
            })
        }
        await followRecordmodel.deleteOne({
            follower: req.verifiedUser.id,
            followerUsername: followerUsername,
            followee: followeeUsername.id,
            followeeUsername: followeeUsername.Username
        })
        res.status(200).json({
            message: "u have unfollowed user successfully"
        })
    } catch (err) {

    }
}
const followRequestcontroller = async (req, res) => {
    try {
        const requests = await followRecordmodel.find({
            followee: req.verifiedUser.id, // we u this to find where followee id is stored in followrec
            status: "Pending" // where status is penduinng 
        }).populate("follower", "Username ProfileImage");
        if (requests.length === 0) {
            return res.status(200).json({
                message: "No pending follow requests.",
                requests: []
            });
        }
        return res.status(200).json({
            message: "Pending follow requests fetched successfully.",
            requests
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
const followReqAcceptController = async (req, res) => {
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
module.exports = {
    FollowUpController,
    UnfollowController,
    followRequestcontroller,
    followReqAcceptController
};