import { compare, hash } from "bcryptjs";
import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken"
import { tokenGenerator } from "../utils/tokenGenerator.js";
export const registerController = async (req, res, next) => {
    try {
        const { username, email, password, mobileNumber } = req.body
        const isUserExist = await userModel.findOne({ $or: [{ username }, { email }, { mobileNumber }] });
        if (isUserExist) {
            let conflictField = "with these details";
            if (isUserExist.email === email) {
                conflictField = "with this Email";
            } else if (isUserExist.username === username) {
                conflictField = "with this Username";
            } else if (isUserExist.phone === phone) {
                conflictField = "with this Phone Number";
            }
            return res.status(409).json({
                message: `User already exists ${conflictField}`
            });
        }
        const hashPassword = await hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
            mobileNumber
        }) 
        const token = tokenGenerator(user)
        res.cookie("token",token)
        res.status(200).json({
            message:"user registration successful",
            user,
        })



    } catch (err) {
        next(err)
    }
}
export const loginContorller = async(req,res,next)=>{
    try{
        const{username,email,password} = req.body
        const isUserExist = await userModel.findOne({$or:[{username},{email}]}).select("+password");
           if (!username && !email) {
            const error = new Error("Please provide either a username or email to login");
            error.statusCode = 400;
            return next(error);
        }
        if(!isUserExist){
            const error = new Error(
                process.env.NODE_ENVIRONMENT==="production" ? "invalid credentials" : "user not found"
            )
            error.statusCode=404
            return next(error)
        }
        let checkPassword = await compare(password,isUserExist.password)
        if(!checkPassword){
            const error  = new Error(
                process.env.NODE_ENVIRONMENT === "production" ? "invalid cridentials" : "incorrect password"
            )
            error.statusCode=401
            return next(error)
            
        }
        const token = tokenGenerator(isUserExist)
        res.cookie("token",token)
        res.status(200).json({
            message:"login successful",
            user:{
                username:isUserExist.username,
                email:isUserExist.email
            }
        })
    }catch(err){
        next(err)

    }
}

