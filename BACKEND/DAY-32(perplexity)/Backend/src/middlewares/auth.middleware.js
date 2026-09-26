import jwt from "jsonwebtoken"

export const TokenVerify = (req,res,next)=>{
     let token = req.cookies.token
        if(!token){
                 const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "unauthorized access"
                    : "token not found"
            );

            error.statusCode = 400;
            return next(error);

        }
        let decoded=null;
        try{
             decoded = jwt.verify(token,process.env.JWT_SECRET)
             req.userVerify = decoded
             next(); 
        }catch(err){
            next(err)

        }
        
}