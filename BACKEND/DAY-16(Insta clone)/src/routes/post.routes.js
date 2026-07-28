
// POST - /api/user/postCreation
 // now here req.body = {caption,img-file};
 // now this api will be protected and the user that will have token will be able to access this token 
const express = require("express");
const { postController } = require("../controllers/postCreation.controller");
const postRouter = express.Router();
const multer = require('multer') // now start reading documentation multer use two storege disk storage and ram storege(for temp) now we will use memory storae bcz we dont store file in server
const upload = multer({storage:multer.memoryStorage()}) // here we have conffig multer that which storage to use
postRouter.post("/postCreation",upload.single("img"),postController) // now in postman or frontend we cant sent file in raw we have to send it through form-data


// upload ("name of file the u will accept from postman,frontend")
module.exports=postRouter;