// const error  = new Error(
//                 process.env.NODE_ENVIRONMENT === "production" ? "invalid cridentials" : "incorrect password"
//             )
//             error.statusCode=401
//             return next(error)


import UserModel from "../model/user.model.js";
import { generateToken } from "../utils/tokenGenereter.js";
import bcrypt from "bcryptjs";

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
            const token = await generateToken(newUser);
            
             res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                success:true,
                message:"user registered successful",
                user:{
                    username,
                    email,
                    token:token
                }
                
            })


    }catch(err){
        next(err)
    }
}



export const loginController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Find user and explicitly select password
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

        // Generate JWT
        const token = generateToken(user);

        // Set cookie
        res.cookie("token", token, {
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
                email: user.email
            }
        });

    } catch (err) {
        next(err);
    }
};




export const getMeController = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        next(err);
    }
};


export const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (err) {
        next(err);
    }
};
