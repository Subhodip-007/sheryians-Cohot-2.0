const jwt  = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const userModel = require("../model/users.model");
const registerAuthController = async (req, res) => {
    try {
        const { Username, Email, Password, Number, ProfileImage } = req.body;
        const isExist = await userModel.findOne({
            $or: [
                { Username },
                { Email },
            ]
        })
        if(isExist){
            return res.status(409).json({
                message: Username ? "user already exist with this username" : "user already exist with this Email"
            });
        }

        let hashPassword = await bcrypt.hash(Password,10);
        const registeredUser = await userModel.create({
            Username,
            Email,
            Password:hashPassword,
            Number,
            ProfileImage,
        })
        const token = jwt.sign({
            id:registeredUser._id,
            username:registeredUser.Username
        },process.env.JWT_SECRET)
        res.cookie("token", token);
        res.status(201).json({
            message:"user registered successfully",
            user: `Hello ${registeredUser.Username} !`
        })


    } catch (err) {
        res.status(500),json({
            message:err.message,
        })
    }
}
const LoginAuthController = async (req,res)=>{
    try{
        const {Username,Email,Password,Number} = req.body;
        const isuserexist = await userModel.findOne({
            $or:[
                {Username},
                {Email}
            ]
        })
        if (!isuserexist) {
    return res.status(404).json({
        message: Username
            ? "User not found with this username"
            : "User not found with this email"
    });
}
        isPasswordCorrect = bcrypt.compare(Password,isuserexist.Password);
        if(!isPasswordCorrect){
             return res.status(409).json({
                message:"invalid password !"
            })
        }
        const token = jwt.sign({
            id:isuserexist._id,
            username:isuserexist.Username
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({
            message:"login successfull !",
            user: `welcome back ${isuserexist.Username} !`
            ,token
        })

    }catch(err){
        res.status(500),json({
            message:err.message,
        })
    }
}
module.exports={registerAuthController,
                LoginAuthController
};