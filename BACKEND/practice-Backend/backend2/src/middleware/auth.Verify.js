
const jwt = require("jsonwebtoken");
const TokenVerify = async (req, res, next) => {

    try {

        let token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                message: "token not found!"
            });

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
module.exports = TokenVerify;