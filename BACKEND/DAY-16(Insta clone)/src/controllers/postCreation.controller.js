const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const client = new ImageKit({
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
    console.log(req.body, req.file);

    const response = await client.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
    });

    console.log(response);

    res.status(200).json({
      message: "File uploaded successfully",
      data: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
}
module.exports = {
    postController
}