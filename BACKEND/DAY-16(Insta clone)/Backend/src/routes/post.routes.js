
// POST - /api/user/postCreation
// now here req.body = {caption,img-file};
// now this api will be protected and the user that will have token will be able to access this token 
const express = require("express");
const { createPostController, GetPostController, GetPostDetailsController, likeController, feedController,unlikeController} = require("../controllers/postCreation.controller");
const postRouter = express.Router();
const multer = require('multer') // now start reading documentation multer use two storege disk storage and ram storege(for temp) now we will use memory storae bcz we dont store file in server
const upload = multer({ storage: multer.memoryStorage() }) // here we have conffig multer that which storage to use 
const identifyUser = require("../middlewares/auth.middlewares");
/**
 * POST - /api/user/postcreation
 */
    postRouter.post("/postCreation", upload.single("img"),identifyUser, createPostController) // now in postman or frontend we cant sent file in raw we have to send it through form-data
// upload ("name of file the u will accept from postman,frontend")

/**
 * GET - /api/user/GetPost
 */
    postRouter.get("/GetPost",identifyUser,GetPostController)

/**
 * GET - /api/user/post/details/:id
 */
    postRouter.get("/post/details/:id",GetPostDetailsController)
/**
 * POST - /api/user/post/like/:postid
 */
postRouter.post("/post/like/:postID",identifyUser,likeController)
postRouter.post("/post/unlike/:postID",identifyUser,unlikeController)
/**
 * @method - POST 
 * @route - /api/post/feed
 * @description - fetch all posts of users 
 * @access - privet 
 */
postRouter.get("/post/feed",identifyUser,feedController)
module.exports = postRouter;