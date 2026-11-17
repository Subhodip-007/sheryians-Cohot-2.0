

import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const tokenVerify = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(" ")[1]; 
        
        

        if (!token) {
            const error = new Error("Access token required");
            error.statusCode = 401;
            return next(error);
        }

        const decoded = jwt.verify(
            token,
            config.ACCESS_SECRET
        );

        req.user = decoded;

        return next();

    } catch (err) {
        const error = new Error(
            err.name === "TokenExpiredError"
                ? "Access token expired"
                : "Invalid access token"
        );

        error.statusCode = 401;
        return next(error);
    }
};
