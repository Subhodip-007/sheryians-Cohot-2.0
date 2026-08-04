const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
const postCreateModel = require("../model/post.model");
const likeModel = require("../model/likes.model");
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
    let allPosts = await postCreateModel.findById(req.verifiedUser.id);
    if(!allPosts){
      return res.status(200).json({
        message:"not post found"
      })
    }
    res.status(200).json({
      message:"all post fecthed",
      allPosts
    })
    
  }catch(err){
    res.status(500).json({
      message: err.message,
      
    })
  }
 }
 const GetpostDetsController = async (req,res)=>{
  try{
      const postId = req.parems.postId;
      const postDetails = await postCreateModel.findById(postId);
      const userId = req.verifiedUser.id
      const isverifiedPost = userId.toString() === postDetails.User_ID.toString();
      if(!isverifiedPost){
        return res.status(404).json({
          message:"post not found"
        })
      }
      res.status(200).json({
        message:"fetched post details",
        postDetails
      })
  }catch(err){
    res.status(500).json({
        message:err.message,
        
      })
  }
 }
 const postLikeController  = async(req,res)=>{
  const postId = req.params.id;
  const fetchedPost = await postCreateModel.findById(postId);
  const isverifiedUser = req.verifyUser.id;
  if(!isverifiedUser){
    return res.status(409).json({
      message:"unauthorizer access !"
    })

  }

  if(!fetchedPost){
    return res.status(404).json({
      message:"post not found !"
    })
  }
  const islikeExist  = await likeModel.findOne({User:isverifiedUser , Post: postId})
  if(islikeExist){
    return res.status(409).json({
      message:"u have already liked this post !"
    })
  }
  let likedpost = await likeModel.create({
    User:req.verifyUser.id,
    Post:postId
  })
  res.status(200).json({
    message:"your like on post is sucessful"
  })

 }
 module.exports = {createPostController
  ,GetPostController,
  GetpostDetsController,
  postLikeController
 };