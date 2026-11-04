// import dotenv  from "dotenv"
// dotenv.config()
// //  normally we have built the token verify as (req,res,next)
// export function handleError(err,req,res,next){
//     const response = {
//         message:err.message,
//     }
//     if(process.env.NODE_ENVIRONMENT === "development"){
//         response.stack = err.stack
//     }

//     res.status(err.status).json({
//         response
//     //     message:err.message,
//     //     // if u want to know where is err 
//     //     stack:err.stack // this is only user for developer 
//     //     // not used in production
//     //     // in production we cant diractly send filestruction
//     //     // so we use env  
//     //     //install package dotenv  
//     //     //create a file 
//     //     // now there is a problem with import and .env 
//     //     //file where u have import dotenv u have to also config to use env variable
//     })
// }
import dotenv from "dotenv";
dotenv.config();

export function handleError(err, req, res, next) {
    // 1. Fallback to 500 (Internal Server Error) if err.status is undefined
    const statusCode = err.status || err.statusCode || 500;

    const response = {
        message: err.message || "An unexpected error occurred",
    };

    // 2. Standard convention uses NODE_ENV instead of NODE_ENVIRONMENT
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENVIRONMENT === "development") {
        response.stack = err.stack;
    }

    // 3. Pass the valid status integer
    res.status(statusCode).json({
        success: false, // Good practice to include a success flag
        ...response
    });
}
