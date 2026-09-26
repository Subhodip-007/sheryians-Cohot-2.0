import jwt from "jsonwebtoken";

export const TokenVerify = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      const error = new Error(
        process.env.NODE_ENV === "production"
          ? "unauthorized access"
          : "unauthorized access : token not found"
      );
      error.statusCode = 401;
      return next(error);
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to request object for downstream middleware/controllers
    req.user = decoded;

    next();
  } catch (err) {
    const error = new Error(
      process.env.NODE_ENV === "production"
        ? "unauthorized access"
        : `unauthorized access : ${err.message}`
    );
    error.statusCode = 401;
    return next(error);
  }
};