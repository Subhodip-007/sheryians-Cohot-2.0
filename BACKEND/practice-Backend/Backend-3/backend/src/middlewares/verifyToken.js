import jwt from "jsonwebtoken";
export const TokenVerify = (req,res,next)=>{
    try{
        let token =  req.cookies.token;
        if(!token){
            const error  = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : token not found")
            error.statusCode = 401
            return next(error)
        }
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            const error  = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token")
            error.statusCode = 401
            return next(error)
        }
        next()
    }catch(err){
        const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : incorrect or expired token")
        error.statusCode = 401
        return next(error)
    }
}