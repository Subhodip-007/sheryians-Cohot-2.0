const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access: token not found"
        });
    }

    let decode;

    try {
        decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access: incorrect token"
        });
    }

    req.verifyUser = decode;

    next();
};

module.exports = verifyUser;