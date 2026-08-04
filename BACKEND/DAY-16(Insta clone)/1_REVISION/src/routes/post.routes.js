const express = require("express");
const multer = require("multer");
const {createPostController,GetPostController, GetpostDetsController, postLikeController} = require("../controllers/post.controller");
const verifyUser = require("../middlewares/auth.middleware");
const multerStorege = multer({storage:multer.memoryStorage()})
const postRoute = express.Router();

 postRoute.post("/create",multerStorege.single("post_img"),createPostController)
 postRoute.get("/Getposts",verifyUser,GetPostController)
 postRoute.get("/GetPost/PostDetails/:postId",verifyUser,GetpostDetsController)
 postRoute.post("/like/:id",verifyUser,postLikeController)
  module.exports = postRoute;