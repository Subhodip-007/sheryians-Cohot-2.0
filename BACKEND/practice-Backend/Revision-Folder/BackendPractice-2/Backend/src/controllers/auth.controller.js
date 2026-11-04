import bcrypt from "bcryptjs";
import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken"
export const registerController = async (req,res,next)=>{
    try{
        const { username,email,password } =  req.body;
        const isUserExist = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        }) 
        if(isUserExist){
            const error = new Error("user exist with this cridential")
            error.statusCode = 409
            return next(error)
        }
        const hashedPassword = await bcrypt.hash(password,10)
       const user = await userModel.create({
            username,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            message:"registration successful",
            success:true,
            user:{
                username,
                email,
                
            }
        })

    }catch(err){ 
        next(err)
    }
}
export const loginController = async (req,res,next)=>{
    try{
        const {username , email , password} = req.body;
        const isUserExist = await userModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        }).select("+password");
        if(!isUserExist){
            const error = new Error("user not found")
            error.statusCode(404);
            return next(error);
        }
        const isMatch = await bcrypt.compare(password,isUserExist.password);
        if(!isMatch){
            const error = new Error("invalid cridentials");
            error.statusCode = 409;
            return next(error)
        }
        const token = jwt.sign({
            _id:isUserExist._id
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({
            message:"login successful",
            success:true,
            user:{
                username:isUserExist.username,
                email:isUserExist.email,
                token

            }
        })
    }catch(err){
        next(err)
        
    }
}
export const getUserController = async(req,res,next)=>{
    try{
        if(!req.verifyToken){
            const error = new Error("unauthorized access")
            error.statusCode = 401
            return next(error)
        }
        const id = req.verifyToken._id;
        const user = await userModel.findById(id);
        if(!user){
            const error = new Error("user not found")
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json({
            message:"info fetched successful",
            success:true,
            user:{
                username:user.username,
                email:user.email
            }
        })

    }catch(err){
        next(err);
    }
}
const logoutController = async(req,res,next)=>{
    try{
        
    }catch(err){

    }
}