import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const registerController = async (req,res) =>{
    try{
        const {username,email,password} = req.body;
        const isUserExist = await userModel.findOne({
            username,
            email
        })
        if(isUserExist){
            return res.status(409).json({
                message:`user with this cridentials exist`
            })
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await userModel.create({
            username,
            email,
            password:hashPassword,
        })
        const token = jwt.sign({
            id:user.id
        },process.env.JWT_SECRET)
        res.cookie("token",token);
        res.status(200).json({
            message:"registration successful",
            token
        })

        
        
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
export const loginController =  async (req,res) =>{
    try{
        const {username , email , password} = req.body;
        const isUserExist = await userModel.findOne({
            $or:[
                {username : username},
                {email : email}
            ]
        })
        if(!isUserExist){
            return res.status(404).json({
                message:"user not found"
            })
        }
        const isCorrectPassword = await bcrypt.compare(password , isUserExist.password) 
        if(!isCorrectPassword){
            return res.status(409).json({
                message:"invalid cridential !"
            })
        }
        const token = jwt.sign({
            id:isUserExist.id
        },process.env.JWT_SECRET)
        res.cookie("token",token);
        res.status(200).json({
            message:" login successful !"
        })
    }catch(err){
        res.status(500).json({
            message:err.message

        })
    }
}
export const getProfile = async (req,res) =>{
    try{
        const token = req.cookies.token;
        console.log(token);
        
        if(!token){
            return res.status(401).json({
                message:"unauthorized access"
            })
        }
        let decode ;
        try{
            decode = jwt.verify(token,process.env.JWT_SECRET);
        }catch(err){
            res.status(401).json({
                message:"unauthoized access",
            })
        }
        const userId = decode.id;
        const userInfo = await userModel.findById(userId);
        res.status(200).json({
            username:userInfo.username,
            email:userInfo.email
        });
    }catch(err){
         res.status(500).json({
            message: err.message
        })
    }
}
export const logoutcontroller = async (req,res) =>{
    try{
        const token = req.cookies.token;
        console.log(token);
        
        if(!token){
            return res.status(401).json({
                message:"unauthorized access"
            })
        }
        let decode ;
        try{
            decode = jwt.verify(token,process.env.JWT_SECRET);
        }catch(err){
            res.status(401).json({
                message:"unauthoized access",
            })
        }
         res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successful"
        });
        
    }catch(err){
         return res.status(500).json({
            message: err.message
        })
    }
}
