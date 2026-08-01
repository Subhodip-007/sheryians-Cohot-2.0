const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
const postCreateModel = require("../model/post.model");
const imagekit = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
});
const createPostController = async (req,res)=>{
    try{
      console.log(req.body, req.file);
        
    const token = req.cookies.token;
    if(!token){
      return res.status(404).json({
         message:"unauthorized access token not found"
      })
    }
    let decode;
    try{
      decode = jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
      return res.status(401).json({
         message:"unauthorized access incorrect token"
      })
    }
   const file =  await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), 'file'),
      fileName: req.file.originalname,
      folder:"REV_insta_clone"
   });
   console.log(file);
   const post = await postCreateModel.create({
      Caption:req.body.Caption,
      ImgSrc:file.url,
      User: req.verifiedUser.id
   })
    res.status(201).json({
      message: "post created !",
      post
    })
   

    }catch(err){
       res.status(500).json({
      message: err.message,
    });
    }

 }
 const GetPostController = async (req,res)=>{
  try{
    
  }catch(err){

  }
 }
 module.exports = {createPostController
  ,GetPostController
 };