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
        message: "You are already following this user."
    });
}
        followRecordmodel.create({
            follower: req.verifiedUser.id,
            followerUsername: followerUsername,
            followee: followeeUsername.id,
            followeeUsername: followeeUsername.Username
        })
        res.status(200).json({
            message: `u started following ${followeeUsername.Username}`
        })


    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}
const UnfollowController = async (req,res)=>{
 try{
    const followeeUsername = await userModel.findOne({ Username: req.params.username });
        const followerUsername = req.verifiedUser.username;
         const alreadyFollowing = await followRecordmodel.findOne({
            followerUsername,
            followeeUsername: followeeUsername.Username

});
if(!alreadyFollowing){
    return res.status(409).json({
        message:"u already dont follow this person"
    })
}
 await followRecordmodel.deleteOne({
     follower: req.verifiedUser.id,
            followerUsername: followerUsername,
            followee: followeeUsername.id,
            followeeUsername: followeeUsername.Username
 })
 res.status(200).json({
    message:"u have unfollowed user successfully"
 })
 }catch(err){

 }
}
module.exports = {FollowUpController,
    UnfollowController
};