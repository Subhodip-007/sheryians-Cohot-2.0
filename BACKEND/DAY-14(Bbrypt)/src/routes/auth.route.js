const express = require("express");
const userDataModel = require("../model/userRegistration.model");
const jwt = require("jsonwebtoken")
const crypto= require("crypto")

const authRoute = express.Router();

authRoute.post("/register",async (req,res)=>{
   try{
    const {username,email,password} = req.body;
    const isEmailExist = await userDataModel.findOne({email})
          if (isEmailExist) {
            return res.status(409).json({
                message: "gmail already exists"
            });
        }
    const hash = crypto.createHash("md5").update(password).digest("hex")
   let user = await userDataModel.create({
    username,email, password:hash
   })
   const token = jwt.sign({
    id: user._id
   },process.env.JWT_SECRET)
   res.cookie("jwt_token",token)
   res.status(201).json({
    message:"regestration is suckassfull",
    user,
    token
   })
   }catch(err){
    res.status(400).json({
        message:err.message
    })
   }

})
authRoute.get("/protected",(req,res)=>{
    
    res.status(200).json({
    cookies: req.cookies
    })
    
})
 authRoute.post("/Login",async (req,res)=>{ // now the is also konwns a function fatarrow function callback
    const {email,password} = req.body; // but this callback runs when some hits the followuing req so this is also knows and controller
    const user = await userDataModel.findOne({ email })
    if(!user){  // check if email exist 
        return res.status(404).json({
            message:"user does not exist"
        })
    }
    const isPasswordCorrect = user.password ===  crypto.createHash("md5").update(password).digest("hex"); // match password condetion
    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    const token = jwt.sign({  // if correct genetate token 
       id:user._id
    },process.env.JWT_SECRET)
    res.cookie('jwt_token',token);
    res.status(200).json({
        message:"user logged in",
        user,
        token
    })
 })
module.exports = authRoute