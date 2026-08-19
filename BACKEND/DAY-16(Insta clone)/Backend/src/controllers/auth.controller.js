const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const registerController = async(req,res)=>{
    const {Username , Email , Password , Bio , ProfileImage} = req.body;
    // const isEmailExist = await userModel.findOne({Email});
    // if(isEmailExist){
    //     return res.status(409).json({
    //         message:"user with this email already exist"
    //     })
    // }
    // const isUsernameExist = await userModel.findOne({Username});
    // if(isUsernameExist){
    //      return res.status(409).json({
    //         message:"user with this username already exist"
    //     })
    // } here me call DB two times bad code load on DB ! insted user $or:[]
    const isUserExist = await userModel.findOne({
        $or:[
            {Username},
            {Email},
        ]
    })
    if(isUserExist){
        res.status(409).json({
            message:`user already exist `+ (isUserExist.Email === Email ? "with this Email" : "with this Username")
        })
    }
    // const hashPassword = crypto.createHash('sha256').update(Password).digest('hex');
    const hashPassword = await bcrypt.hash(Password,10) //(pasword , salt)
    const user = await userModel.create({
        Username,
        Email,
        Password:hashPassword,
        Bio,
        ProfileImage,
    })
    const token = jwt.sign({
       id:user._id,
       username:user.Username
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token);
    res.status(201).json({
        message:`user regestered successfull`,
        Username: user.Username,
        Email:user.Email,
        ProfileImage:user.ProfileImage,

    }) // ask ai y we dont send password inresponse
}

const loginController = async (req,res)=>{
    const { Username,Email,Password } = req.body;
    // now user can login based on 
    // username -  password
    // email - password
    const user = await userModel.findOne({
        $or:[
            {
              Username:Username
            },
            {
                Email:Email
            }
        ]
    }).select("+Password")
    if(!user){
        return res.status(404).json({
            message: "user not found "+(Username ? "with this username" : "with this email")  
        })
    }
    // const hashPassword = crypto.createHash('sha256').update(Password).digest('hex');
    // const ispaswordMatch = hashPassword === user.Password
    const ispaswordMatch = await bcrypt.compare(Password,user.Password)
    if(!ispaswordMatch){
        return res.status(401).json({
            message: "password is invalid"
        })
    }
    const token = jwt.sign({
        id:user._id,
        username:user.Username
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({
        message:"user loggedin successfull",
        username:user.Username
    })
}
const GetprofileController = async (req,res)=>{
    try{
        if(!req.verifiedUser){
            return res.status(401).json({
                message:"unauthorized access"
            })
        }
        const userinfo = await userModel.findById(req.verifiedUser.id)
        res.status(200).json({
            message:"user profile fetched successfull",
            username:userinfo.Username,
            email:userinfo.Email
        })

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports = {
    registerController,
    loginController,
    GetprofileController
}