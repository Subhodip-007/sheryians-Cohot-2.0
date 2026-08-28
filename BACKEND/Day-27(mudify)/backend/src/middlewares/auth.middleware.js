 

import JWT from "jsonwebtoken";

const TokenVerify = (req, res, next) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access"
    });
  }

  try {
    // Verify token
    const verifyToken = JWT.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach decoded token data to request
    req.verifyToken = verifyToken;

    // Move to next middleware/controller
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

export default TokenVerify;

