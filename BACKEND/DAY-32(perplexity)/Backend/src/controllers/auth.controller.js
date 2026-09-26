import { userModel } from "../model/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken"

export const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isUserExist = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (isUserExist) {
            const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "User already exists"
                    : "User exists with these credentials"
            );

            error.statusCode = 400;
            return next(error);
        }

        // Password will be hashed by Mongoose pre-save middleware
        const user = await userModel.create({
            username,
            email,
            password
        });
        const emailVerificationToken = jwt.sign({
    email:user.email,
},process.env.JWT_SECRET)
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
// now we will create a token


        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        next(err);
    }
};
export const verifyEmailController = async (req,res,next)=>{
    try{
        const {token} = req.query;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "token expired"
                    : "token has expired"
            );

            error.statusCode = 400;
            return next(error);
        }
        const user = await userModel.findOne({email:decoded.email})
        if(!user){
            const error = new Error("user not found")
            error.statusCode = 400
            return next(error)
        }
        user.verified = true;
        await user.save();
          const html =`<p>email verified !</p>
                        <a href="http://localhost:3000/api/auth/login">login<a>
          ` 
          res.send(html)
          res.status(200).json({
            message: "email verified successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }catch(err){
        next(err)

    }
}
export const loginController = async(req,res,next )=>{
    try{
       const { email,password } =req.body;
       const user = await userModel.findOne({email})
        if(!user){
             const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "User not found"
                    : "User don't exists with these credentials"
            );

            error.statusCode = 404;
            return next(error); 
        }
         const isMatch = await user.comparePassword(password);
         if(!isMatch){
                const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "invalid cridential"
                    : "incorrect password"
            );

            error.statusCode = 400;
            return next(error);
         }
         if(!user.verified){
                const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "unauthorized access"
                    : "User not verified"
            );

            error.statusCode = 400;
            return next(error);
         }
         const token = jwt.sign({
            id:user._id,
            username:user.username,

         },process.env.JWT_SECRET,{expiresIn:'7d'})
         res.cookie("token",token)
         res.status(200).json({
            message:"user login sucessful",
            success:true,
            user
            
         })


    }catch(err){
        next(err)

    }
} 

export const getUserController = async(req,res,next)=>{
     try{
       if(!req.user){
            const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "unauthorized access"
                    : "token invalid"
            );

            error.statusCode = 400;
            return next(error);
       }
       const userId = req.user._id;
       const user = await userModel.findById(userId);
       if(!user){
            const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "user not found"
                    : "User not exist with this id"
            );

            error.statusCode = 404;
            return next(error);
       } 
       res.status(200).json({
        message:"user fetched successful",
        success:true,
        user
       })

     }catch(err){
        next(err)
     }
} 
