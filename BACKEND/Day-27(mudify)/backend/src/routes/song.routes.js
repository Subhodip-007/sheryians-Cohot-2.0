const express = require("express");

const upload = require("../middlewares/upload.middleware");
const { songUploadController, getSongController } = require("../controller/song.controller");
 const songRouter = express.Router()
 /**
  * @method - POST
  * @routes - /api/songs/upload
  * @description - 
  */
 songRouter.post("/upload",upload.single("song"),songUploadController)
 // now a song file has multiple things 
 // poster tilte artist albam time 
 // this can be read directly 
 // to read we have a package name node-id3 this will help to rad everything
 songRouter.get('/get',getSongController)
 module.exports = songRouter