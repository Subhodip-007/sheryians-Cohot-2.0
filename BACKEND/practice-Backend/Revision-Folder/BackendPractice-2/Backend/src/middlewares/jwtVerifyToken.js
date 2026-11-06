import jwt from "jsonwebtoken"
import { BlacklistTokenModel } from "../model/tokenBlacklist.model.js";
export const TokenVerify = async (req, res, next) => {

    try {

        let token = req.cookies.token;
       
        if (!token) {

            return res.status(401).json({
                message: "token not found!"
            });

        }
        let blToken = await BlacklistTokenModel.findOne({ token });
if (blToken) {
    return res.status(401).json({ message: "unauthorized access" });
}

        let verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.verifyToken = verifyToken;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "unauthorized access: incorrect or expired token"
        });

    }

};