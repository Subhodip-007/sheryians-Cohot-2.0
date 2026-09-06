importent thing 
#Error handleing 
the api which is responding unka format unka structure 
consistent honacheiya 


like 
/register ==> res{
    message:"user regestered successfully"
    user:{}
}
/login ==> res{
    message:"user login successfully"
    user:{}
}

// now we will study about a default Error
//lets aetup a quick server 
// i package.json we r seting type module 
//  bcz this time me will user import insted of 

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


## express - valodator 
now we have studued about 
authentication - done 
authorization
# validation -- todat we will study check format of data
verification


# validation
for now lets take example of user 
how user will look
user :{
    username:{
        type:string,
        req:true
    }, email:{
        type:string,
        req:true
        unique:true 
    }, password:{
        type:string,
        req:true
    }

}

now there is a proper step or folw that a req follows app--> authroute---->/register--->controller 
now mostly controller perform harvy task and 
if something goes wrong the it will cost 
so we user validation in btw route and controllers
for the we user a package npm i express-validator
now in your routes folder