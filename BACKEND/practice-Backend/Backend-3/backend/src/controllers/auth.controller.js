import { hash } from "bcryptjs";
import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken"
const registerController = async (req, res, next) => {
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
        const user = userModel.create({
            username,
            email,
            password: hashPassword
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); 
        res.cookie("token",token)
        res.status(200).json({
            message:"user registration successful",
            user,
        })



    } catch (err) {
        next(err)
    }
}