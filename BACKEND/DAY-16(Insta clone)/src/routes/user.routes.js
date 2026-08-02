const express = require("express");
const identifyUser = require("../middlewares/auth.middlewares");
const {FollowUpController,UnfollowController,followRequestcontroller,followReqAcceptController} = require("../controllers/user.controller");
const userRoute = express.Router();

/**
 * @routes /api/user/follow/:username
 * @description endpoint user to follow someone by passing username in parameter
 * 
 */
userRoute.post("/follow/:username",identifyUser,FollowUpController);


/**
 * @routes /api/user/follow/requests
 * @description endpoint where followe can check all requests
 * 
 */
userRoute.get("/follow/requests",identifyUser,followRequestcontroller)
/**
 * @routes /api/user/unfollow/:username
 * @description endpoint user to accept req someone by passing reqID in parameter
 * Find request
      ↓
Exists?
      ↓
Is logged-in user the followee?
      ↓
Is status pending?
      ↓
Change status → accepted
      ↓
Save
      ↓
Return success
 */
userRoute.patch("/follow/requests/accept/:requestid",identifyUser,followReqAcceptController)
/**
 * @routes /api/user/unfollow/:username
 * @description endpoint user to unfollow someone by passing username in parameter
 * 
 */

userRoute.post("/unfollow/:username",identifyUser,UnfollowController)


module.exports = userRoute;