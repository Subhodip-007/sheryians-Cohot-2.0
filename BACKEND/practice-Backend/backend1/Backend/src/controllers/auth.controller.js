const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const registerController = async (req, res) => {
    try {
        const { Username, Email, Password } = req.body;
        const isExistUser = await userModel.findOne({
            Username,
            Email
        })


        if (isExistUser) {
            return res.status(409).json({
                message: `user already exist ` + (isExistUser.Email === Email ? "with this Email" : "with this Username")
            })
        }
        const hashPassword = await bcryptjs.hash(Password, 10);
        const user = await userModel.create({
            Username,
            Email,
            Password: hashPassword
        })
        const token = jwt.sign({
            id: user.id,

        }, process.env.JWT_SECRET)
        res.cookie("token", token);
        res.status(200).json({
            message: `registered successful !`,
            Username: user.Username,
            token
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
const loginController = async (req, res) => {
    try {
        const { Username, Email, Password } = req.body;
        const isUserExist = await userModel.findOne({
            $or: [
        { Username: Username },
        { Email: Email }
    ]
        })
        if (!isUserExist) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        const isCorrectPassword = await bcryptjs.compare(Password, isUserExist.Password);
        if (!isCorrectPassword) {
            return res.status(409).json({
                message: "password incorrect !"
            })
        }
        const token = jwt.sign({
            id: isUserExist.id

        }, process.env.JWT_SECRET)
        res.cookie("token", token);
        res.status(200).json({
            message: `welcome back ${isUserExist.Username}`
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })

    }
}
const GetProfileController =async (req, res) => {
    try {
        let token = req.cookies.token
        if (!token) {
            res.status(401).json({
                message: "unauthorized access"
            })
        }
        let decode;
        try {

            decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

        } catch (err) {
            res.status(401).json({
                message: "unauthorized access",
            })
        }
        const userId = decode.id;
        const userInfo = await userModel.findById(userId);
        return res.status(200).json({
            Username: userInfo.Username,
            Email: userInfo.Email
        });


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
const logoutController = async (req, res) => {
    try {
        let token = req.cookies.token
        if (!token) {
           return res.status(401).json({
                message: "unauthorized access"
            })
        }
        let decode;
        try {

            decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

        } catch (err) {
           return res.status(401).json({
                message: "unauthorized access",
            })
        }
        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successful"
        });


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
module.exports = {
    registerController,
    loginController,
    logoutController,
    GetProfileController

}