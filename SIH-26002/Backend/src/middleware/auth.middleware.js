import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const authMiddleware = async (
    req,
    res,
    next
) => {

    try {

        const token =
            req.cookies.token;


        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }


        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        const user =
            await User.findById(
                decoded.userId
            ).select("-password");


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }
        if (!user.isActive) {
    return res.status(403).json({
        success: false,
        message: "Your account has been deactivated"
    });
}


        req.user = user;

        next();

    } catch (error) {

        if (
            error.name ===
            "TokenExpiredError"
        ) {

            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }


        if (
            error.name ===
            "JsonWebTokenError"
        ) {

            return res.status(401).json({
                success: false,
                message: "Invalid authentication token"
            });
        }


        next(error);
    }
};


export default authMiddleware;