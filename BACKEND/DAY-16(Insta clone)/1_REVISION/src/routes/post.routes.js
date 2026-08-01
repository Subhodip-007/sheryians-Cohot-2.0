const express = require("express");
const multer = require("multer");
const createPostController = require("../controllers/post.controller");
const verifyUser = require("../middlewares/auth.middleware");
const multerStorege = multer({storage:multer.memoryStorage()})
const postRoute = express.Router();

 postRoute.post("/create",multerStorege.single("post_img"),createPostController)
 postRoute.get("/Getposts",verifyUser,createPostController.GetPostController)
  module.exports = postRoute;