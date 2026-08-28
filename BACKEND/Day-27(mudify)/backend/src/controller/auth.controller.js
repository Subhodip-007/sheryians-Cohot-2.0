const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { tokenGenerater } = require("../utils/tokenGenerater");
const JWT = require("jsonwebtoken");
const { redirect } = require("react-router");
const registerController = async (req,res)=>{
    try{
        const {username , email , password} = req.body;
        const isUserExist = await userModel.findOne(
            {$or:[{username},{email}]}
        )
        if(isUserExist){
            return res.this.status(404).json({
                message:"invalid cridentil"
            })
        }
        const hashpassword = await bcrypt.hash(password,10);

        
        const user = await userModel.create({
            username,
            email,
            password:hashpassword
        })
        let token =tokenGenerater(user);
         res.cookie("token",token)
         return res.status(201).json(
            {
                message:"user registeration successfully",
                token
            }
         )
    }catch(err){
        return res.status(500).json({
            message:err.message
        })

    }

}
const loginController = async (req,res)=>{
  try{
    const {email,username,password} = req.body
   const isuserExist = await userModel.findOne({
    $or:[
      {username:username},
      {email:email}
    ]
  }).select("+password");
  if(!isuserExist){
    return res.status(404).json({
      message : "Invalid credential"
    })
  }
  const ispasswordCorrect = await bcrypt.compare(password,isuserExist.password)
  if(!ispasswordCorrect){
    return res.status(401).json({
     message:"Invalid credential"
    })
  }
   const token = tokenGenerater(isuserExist)
  res.cookie("token", token);
  res.status(200).json({
    message:`welcome back ${isuserExist.username}`
  })

  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}
const getMeController = async(req,res)=>{
  try{
   if(!req.verifyToken){
    return res.status(401).json({
      message: "Unauthorized access"
    });
   }
    const getUser = await userModel.findById(req.verifyToken._id);
    if(!getUser){
      return res.status(404).json({
        message:"user not found"
      })
    }
    return res.status(200).json({
      message:"user info",
      getUser
    })
    


  }catch(err){
     res.status(500).json({
      message:err.message
    })

  }


}
module.exports = {registerController,
  loginController,
  getMeController
}