
import { config } from "../config/config.js";
import { sessionModel } from "../model/session.model.js";
import UserModel from "../model/user.model.js";
import { generateToken } from "../utils/tokenGenereter.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { generateOtp, getOtpHtml } from "../utils/generateOTP.js";
import OtpModel from "../model/otp.model.js";
import { sendEmail } from "../services/mail.service.js";
export const registerController  = async (req,res,next)=>{
    try{
            const { username,email,password } = req.body;
            const user = await UserModel.findOne({
                $or:[
                    {username},
                    {email}
                ]
            }) 
            if(user){
                const error = new Error("user already exist");
                error.statusCode = 403;
                return next(error)
            } 
                const newUser = await UserModel.create({
                username,
                email,
                password
                })
                const otp = generateOtp()
                const html = getOtpHtml(otp)
                const otpHash = await bcrypt.hash(otp,10);
                await OtpModel.create({
                    email:email,
                    otp:otpHash
                })
                await sendEmail(
    email,
    "Verify Your Account",
    `Your OTP is ${otp}. It expires in 5 minutes.`,
    html
);
            res.status(200).json({
                success:true,
                message:"user registered successful",
                user:{
                    username:newUser.username,
                    email:newUser.email,
                }
                
            })


    }catch(err){
        return next(err)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const user = await UserModel.findOne({
            $or: [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : [])
            ]
        }).select("+password");

        // Check if user exists
        if (!user) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            return next(error);
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            return next(error);
        }
           if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email first"
            });
        }

        const refreshToken = generateToken.generateRefreshToken(user);
        const accessToken = generateToken.generateAccessToken(user);
        const hashtoken = await bcrypt.hash(refreshToken,10)
        const session = await  sessionModel.create({
            user:user._id,
            token:hashtoken,
            ip:req.ip,
            userAgent:req.headers["user-agent"]
        })

        // Set cookie
        res.cookie("Token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
                accessToken:accessToken
            }
        });

    } catch (err) {
        next(err);
    }
};

export const getMeController = async (req, res, next) => {
    try {

        // 2 middlemare verify token and find user 
         const user = await UserModel.findById(req.user._id)
            .select("-password");
        // 4. Check whether user exists
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        // 5. Send response
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        if (err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError") {
            err.statusCode = 401;
            err.message = "Invalid or expired token";
        }

        return next(err);
    }
};

export const rotateTokenController = async(req,res,next)=>{
    try{
        const refreshToken = req.cookies.Token;
        if(!refreshToken){
            const error = new Error("token not found")
            error.statusCode=404;
            next(error)
        }
        const decoded = jwt.verify(refreshToken,config.REFRESH_SECRET);
        if(!decoded){
             const error = new Error("invalid token")
            error.statusCode=401;
            next(error)
        }
          const accessToken = jwt.sign({
            _id:decoded._id
        },config.ACCESS_SECRET,{
            expiresIn:"15m"
        })
        // for security we can generate new refresh token 
        const newRefreshToken = jwt.sign({
            _id:decoded._id
        },config.REFRESH_SECRET,{
            expiresIn:"7d"
        })
                res.cookie("Token",newRefreshToken),{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge :7*24*60 *60 * 1000 //7days
         }
        res.status(200).json({
            message:"accessToken refreshed successful",
            accessToken:accessToken,
            success:true
        })


    }catch(err){
        next(err)
    }
}

export const logoutController = async (req, res, next) => {
    try {
       const token  = req.cookies.Token;
       if(!token){
        const error = new Error("token not found")
        error.statusCode = 404;
        return next(error)
       }
       const hashtoken = bcrypt.hash(token,10);
       const isvalid = sessionModel.findOne({
        token:hashtoken,
        revoked:false
       })
       if(!isvalid){
        const error = new Error("invalid token")
        error.statusCode = 401;
        return next(error)
       }
       isvalid.revoked = true;
       res.clearCookie("Token");
       await isvalid.save()

    } catch (err) {
       return next(err);
    }
};
// logout all 

// for logout 
// during login set refresh token 
///hash and create a session storing hashed reftoken , user , ip , useragent
// then access token an alll

// in rotate take token from cookie and hash and find session with revoke false 
// if now set new token in session 
 // logout feature send email and otp
