const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../model/post.model");
const likeModel = require("../model/likes.model");

const imgkit = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
});
const createPostController = async (req, res) => {
  //  console.log(req.body,req.file); // first post file will come to server and then to imagekit(what is the role of img kit)
  //  // now when u sent through postman express cant read req.body by default
  //  // we need another middleware like express.json for this we user a package name npm i multer
  //  await client.files.upload({
  //   file: await toFile(Buffer.from(req.file.Buffer), 'file'),
  //   fileName: 'img',
  // });
  try {
    // console.log(req.body, req.file);
    // const token = req.cookies.token
    // if (!token) {
    //   return res.status(401).json({
    //     message: "unauthorized access"
    //   })
    // }
    // let decode;
    // try {
    //   decode = jwt.verify(token, process.env.JWT_SECRET)
    //   console.log(decode);
    // } catch (err) {
    //   return res.status(401).json({
    //     message: "unauthorized access",

    //   })
    // }  this code is shifted to middleware -> auth.mw.js

    const file = await imgkit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "test",
      folder: "insta-user-post"
    });
    const post = await postModel.create({
      caption: req.body.caption,
      img_url: file.url,
      user: req.verifiedUser.id,
    })
    await post.populate("user");
    res.status(201).json({
      message: "post created !",
      post,
    })


  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

const GetPostController = async (req, res) => {
  try {

    let userId = req.verifiedUser.id
    console.log(userId);

    let allPosts = await postModel.find({
      user: userId
    })
    res.status(200).json({
      message: "All Posts Fetched",
      allPosts
    })

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
const GetPostDetailsController = async (req, res) => {
  try {
    // console.log(req.params.id);
    const postId = req.params.id;
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({
    //     message: "unauthorized access"
    //   })

    // }
    //  let decode;
    //   try{
    //     decode = jwt.verify(token,process.env.JWT_SECRET)
    //   }catch(err){
    //     res.status(401).json({
    //       message:"unautharized access TOKEN NOT FOUND"
    //     })
    //   }
    let userId = req.verifiedUser.id;
    const fetchPostById = await postModel.findById(postId);
    let isVerifiedPost = userId.toString() === fetchPostById.user.toString();
    if (!isVerifiedPost) {
      return res.status(404).json({
        message: "post not found !"
      })
    }
    res.status(200).json({
      message: "post fetched !",
      fetchPostById

    })


  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
const likeController = async (req, res) => {
  const username = req.verifiedUser.username;
  const postID = req.params.postID;
  const post = await postModel.findById(postID);
  if (!post) {
    return res.status(404).json({
      message: "post not found"
    })
  }
  const like = await likeModel.create({
    post: postID,
    username: username,
    userID: req.verifiedUser.id,

  })
  res.status(200).json({
    message: "like successfull",
    like
  })
}
const unlikeController = async (req, res) => {
  try {
    const username = req.verifiedUser.username;
    const postID = req.params.postID;

    const deletedLike = await likeModel.findOneAndDelete({
      post: postID,
      username: username,
      userID: req.verifiedUser.id,
    });

    if (!deletedLike) {
      return res.status(400).json({
        message: "You have not liked this post",
      });
    }

    return res.status(200).json({
      message: "Unlike successful",
      deletedLike,
    });

  } catch (err) {
    console.error("UNLIKE ERROR:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
};
const feedController = async (req, res) => {
  try {
    if (!req.verifiedUser) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const posts = await postModel
      .find()
      .populate("user")
      .sort({ _id: -1 }) // createdat or objid read about objid 
      .lean();

    const feed = await Promise.all(
      posts.map(async (post) => {
        const isLike = await likeModel.findOne({
          userID: req.verifiedUser.id,
          post: post._id
        });

        post.isLike = Boolean(isLike);

        console.log("Like found:", isLike);
        return post;
      })
    );
    res.status(200).json({
      message: "all post fetched successfully..",
      feed
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}
module.exports = {
  createPostController,
  GetPostController,
  GetPostDetailsController,
  likeController,
  feedController,
  unlikeController
}
// NOW U SEE A COMMON CODE IN THREE ENDPOINTS --  THAT IS WHERE MIDDLEWEAR COMES IN ROLE  