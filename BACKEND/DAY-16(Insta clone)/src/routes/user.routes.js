const express = require("express");
const identifyUser = require("../middlewares/auth.middlewares");
const {FollowUpController,UnfollowController} = require("../controllers/user.controller");
const userRoute = express.Router();

/**
 * @routes /api/user/follow/:username
 * @description endpoint user to follow someone by passing username in parameter
 * 
 */
userRoute.post("/follow/:username",identifyUser,FollowUpController);

/**
 * @routes /api/user/unfollow/:username
 * @description endpoint user to unfollow someone by passing username in parameter
 * 
 */
userRoute.post("/unfollow/:username",identifyUser,UnfollowController)
module.exports = userRoute;