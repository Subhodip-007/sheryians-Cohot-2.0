const id3 = require("node-id3");
const storageService = require("../services/storage.service");
const songModel = require("../models/song.model");
const songUploadController = async(req,res)=>{
//    const tags = id3.read(req.file.buffer)// accepts a buffer
//    console.log(req.file);
//     console.log(tags);
const songBuffer = req.file.buffer
const {mood} = req.body
    const tags = id3.read(songBuffer) //now using this info we can store in DB 
    // now in db we will store URL and access through imgkit
    const songFile = await storageService.uplaodFile({
        buffer:songBuffer,
        fileName:tags.title + ".mp3",
        folder:"/cohot-2/mudify/songs"
    })
    const posterFiles = await storageService.uplaodFile({
        buffer:tags.image.imageBuffer,
        fileName:tags.title + ".jpeg",                             /// optamize this code using promiss aall
        folder:"/cohot-2/mudify/posters"

    })
    const song = await songModel.create({
        title:tags.title,
        url:songFile.url,
        posterUrl:posterFiles.url,
        mood
    })
    res.status(201).json({
        message:"songs created successfully ",
        song
    })
}
module.exports = {songUploadController}