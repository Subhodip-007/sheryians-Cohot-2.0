const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../model/post.model");
const imgkit = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
});
const postController = async (req,res)=>{
//  console.log(req.body,req.file); // first post file will come to server and then to imagekit(what is the role of img kit)
//  // now when u sent through postman express cant read req.body by default
//  // we need another middleware like express.json for this we user a package name npm i multer
//  await client.files.upload({
//   file: await toFile(Buffer.from(req.file.Buffer), 'file'),
//   fileName: 'img',
// });
 try {
    // console.log(req.body, req.file);
    const token = req.cookies.token
    if (!token){
      return res.status(401).json({
        message:"unauthorized access"
      })
    }
    let decode;
    try{
           decode = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode);
    }catch(err){
     return res.status(401).json({
        message:"unauthorized access",

      })
    }
    const file = await imgkit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer),"file"),
      fileName: "test",
      folder:"insta-user-post"
    });
    const post = await postModel.create({
      caption:req.body.caption,
       img_url:file.url,
       user: decode.id,
    })
    res.status(201).json({
      message:"post created !",
      post
    })

    
  } catch (err) {
   res.status(500).json({
        message: err.message,
    });
  }
}
module.exports = {
    postController
}