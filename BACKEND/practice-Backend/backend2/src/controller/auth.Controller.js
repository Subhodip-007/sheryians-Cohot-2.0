const JWT = require("jsonwebtoken");
const userModel = require("../model/user.model");
const  bcrypt  = require("bcryptjs");
const generateatoken = require("../utils/generateatoken");

const registerContoller = async (req,res)=>{
 try{
       const {Username,Email,Password} = req.body;
       const hashPassword = await bcrypt.hash(Password,10)
  const user = await userModel.create({
    Username,
    Email,
    Password:hashPassword
  })
 const token =  generateatoken(user)
res.cookie("token", token);


  res.status(201).json({
    message:"user regestered successful !",
    user
  })
    
 }catch(err){
      //Code 11000 means MongoDB blocked a duplicate Email instantly
  if (err.code === 11000) {
    return res.status(400).json({ 
        error: "Email already registered" 
    });
  }

  // Handle other unexpected errors
  return res.status(500).json({ error: "Internal server error" + err.message });
 }
}
const loginController = async (req,res)=>{
  try{
    const {Email,Username,Password} = req.body
   const isuserExist = await userModel.findOne({
    $or:[
      {Username:Username},
      {Email:Email}
    ]
  }).select("+Password");
  if(!isuserExist){
    return res.status(404).json({
      message : Username ?`user does not exist with this username`:`user does not exist with this emailID`
    })
  }
  const isPasswordCorrect = await bcrypt.compare(Password,isuserExist.Password)
  if(!isPasswordCorrect){
    return res.status(401).json({
     message:"incorrect password !"
    })
  }
  const token = JWT.sign({
    _id : isuserExist._id,
    Username:isuserExist.Username
  },process.env.JWT_SECRET, {
    expiresIn: "1d"
  })
  res.cookie("token", token);
  res.status(200).json({
    message:`welcome back ${isuserExist.Username}`
  })

  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}
module.exports = {registerContoller,
  loginController
}