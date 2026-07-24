const express = require("express");
const userRegestrationModel = require("../model/userRegister.model");
const jwt = require("jsonwebtoken");
const userDataModel = require("../../../DAY-14(Bbrypt)/src/model/userRegistration.model");
const bcrypt = require("bcrypt")
const autHRouter = express.Router();
// ROUTER FOR USER REGESTRATION /register
autHRouter.post("/register",async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const isEmailExist= await userRegestrationModel.findOne({email});
        if(isEmailExist){
            return res.status(409).json({
                message:`user already exist with this email-'${isEmailExist.email}'`
            })
        }
        const user = await userRegestrationModel.create({
            name,
            email,
            password:hashPassword,
        })
        const token = jwt.sign({id:user._id,},process.env.JWT_SECRET)
        res.cookie("token",token);
        
        res.status(201).json({
            message:"user regestration successfull",
            userINFO:user,
            token:token,
        })
    }catch(err){
        res.status(409).json({
            message:`cannot register error${err.message}`
        })
    }

})
// verify user using token of user
autHRouter.post("/verify",async(req,res)=>{
  try{
    const token = req.cookies.token;
    let verify = jwt.verify(token,process.env.JWT_SECRET);
    const verifiedUser = await userRegestrationModel.findById(verify.id);
    res.status(200).json({
        message:"user verified successfully",
        verifiedUser,
    })
  }catch(err){
    res.status(400).json({
        message:"user cant be verified",
        err
    })
  }

})
// login api 
autHRouter.post("/login",async(req,res)=>{
try{
    const {email,password} = req.body;
 const isUserExist = await userRegestrationModel.findOne({email})
 if(!isUserExist){
    return res.status(404).json({
        message:"email is not regestered"
    })
  
 }
 const isCorrectPassword = await bcrypt.compare(password ,isUserExist.password)
 if(!isCorrectPassword){
    res.status(404).json({
        message:"invalid password"
    })
 }
  const token = jwt.sign({  // if correct genetate token 
       id:isUserExist._id
    },process.env.JWT_SECRET , {expiresIn: "5h"})
    res.cookie('token',token);
    res.status(200).json({
        message:"user logged in",
        isUserExist,
        token
    })
}catch(err){
    err.message
}


})
module.exports = autHRouter;