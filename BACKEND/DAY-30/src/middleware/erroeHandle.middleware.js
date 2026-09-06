import dotenv  from "dotenv"
dotenv.config()
//  normally we have built the token verify as (req,res,next)
export function handleError(err,req,res,next){
    const response = {
        message:err.message,
    }
    if(process.env.NODE_ENVIRONMENT === "development"){
        response.stack = err.stack
    }

    res.status(err.status).json({
        response
    //     message:err.message,
    //     // if u want to know where is err 
    //     stack:err.stack // this is only user for developer 
    //     // not used in production
    //     // in production we cant diractly send filestruction
    //     // so we use env  
    //     //install package dotenv  
    //     //create a file 
    //     // now there is a problem with import and .env 
    //     //file where u have import dotenv u have to also config to use env variable
    })
}