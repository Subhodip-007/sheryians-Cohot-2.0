
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const tokenVerify = async (req, res, next) => {
    try {
        // Get token from HTTP-only cookie
        const token = req.cookies?.token;

        if (!token) {
            const error = new Error("Authentication required");
            error.statusCode = 401;
            return next(error);
        }

        // Verify JWT
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Attach user information to request
        req.user = decoded;

        next();

    } catch (err) {
        const error = new Error("Invalid or expired token");
        error.statusCode = 401;
        return next(error);
    }
};
