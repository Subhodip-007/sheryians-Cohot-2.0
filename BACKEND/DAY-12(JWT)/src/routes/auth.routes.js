const express = require('express');
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken'); // now we have to generate JWT_SECRET we have a web site
// 
const authrouter = express.Router() // this allowes u to use api in any file 
// key jitna bada utna secure and processing power generally generate 256bit
//now save it in .env folder 
// to generate token we need user data + JWT_SECRET;
authrouter.post("/register",async(req,res)=>{
   try{
     const {username , email , password} = req.body;
     const isuserexist = await userModel.findOne({ email })
     if(isuserexist){
        return res.status(400).json({
            message:"user already exist with this email address"
        })  // status 400 409
     }
    const user = await userModel.create({
        username,email,password
    })
    const token = jwt.sign({
        id:user._id,
        email:user.email
        
        
    },process.env.JWT_SECRET)
    res.status(201).json({
        message:"user regestered",
        user,token
    })
   }catch(err){
    res.status(500).json({
     message:err.message
    })
   }
})
module.exports = authrouter;
// //{
//     "message": "user regestered",
//     "user": {
//         "username": "subhodip",
//         "email": "js2005@gmail.com",
//         "password": "rouixshub2005",
//         "_id": "6a5b6c9c41363dbe4eeb0ba7",
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWI2YzljNDEzNjNkYmU0ZWViMGJhNyIsImVtYWlsIjoianMyMDA1QGdtYWlsLmNvbSIsImlhdCI6MTc4NDM3NjQ3Nn0.E6jNAB06r8-gMu7XSNG-wLoxYDKChuUO8ZHqEwXAcLQ"
// } 

// now this tocken have all data to check gon to website jwtdecode