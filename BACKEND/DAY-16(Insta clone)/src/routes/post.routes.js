
// POST - /api/user/postCreation
// now here req.body = {caption,img-file};
// now this api will be protected and the user that will have token will be able to access this token 
const express = require("express");
const { createPostController, GetPostController, GetPostDetailsController } = require("../controllers/postCreation.controller");
const postRouter = express.Router();
const multer = require('multer') // now start reading documentation multer use two storege disk storage and ram storege(for temp) now we will use memory storae bcz we dont store file in server
const upload = multer({ storage: multer.memoryStorage() }) // here we have conffig multer that which storage to use
    
/**
 * POST - /api/user/postcreation
 */
    postRouter.post("/postCreation", upload.single("img"), createPostController) // now in postman or frontend we cant sent file in raw we have to send it through form-data
// upload ("name of file the u will accept from postman,frontend")

/**
 * GET - /api/user/GetPost
 */
    postRouter.get("/GetPost",GetPostController)

/**
 * GET - /api/user/post/details/:id
 */
    postRouter.get("/post/details/:id",GetPostDetailsController)
module.exports = postRouter;