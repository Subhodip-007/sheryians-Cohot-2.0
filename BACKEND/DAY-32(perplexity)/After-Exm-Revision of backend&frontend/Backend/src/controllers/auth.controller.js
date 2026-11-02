
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js";
export const registerController = async (req,res)=>{
    try{
        const { username , email , password } = req.body;

        const isUserExist =  await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        })
        if(isUserExist){
            return res.status(401).json({
                message:"user exist with this email",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
       const user = await userModel.create({
            username,
            email,
            password:hashedPassword
        })
        const emailVerificationToken = jwt.sign({
            email:email
        },process.env.JWT_SECRET,{ expiresIn: "1h" });
         await sendEmail({
    to: email,
    subject: "Email Verification",
    text: `Hello ${username}, please verify your email.`,
    html: `
        <h2>Hello ${username}</h2>
        <p>Please verify your email by clicking on link.</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">verify email</a>
    `,
});
 res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }catch(err){
        return res.status(500).json({
            message:err.message,
            success:false
        })
        
    }
}
// now insded of query we will pass token using parems 