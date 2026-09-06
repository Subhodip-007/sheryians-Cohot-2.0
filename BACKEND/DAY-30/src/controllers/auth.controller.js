export const registerController = async (req,res,next) => {
  // this will give internal server error
 // this is a inbuilt error handler that prevents server from crashing
 // but the problew is it gives respons format in html form but me need in json form 
 try{
   //  throw new Error("Encounter an error while registering new user...")
    res.status(200).json({
      message:"user regestered successfully"
    })
 }catch(err){
    err.status = 400
    next(err)
 }
} 
// if it would have worked it would have res something like {message:"",user:{id:12,username:"",email:""}
// in json format 
// AND  
// returns error in html format 
// now 
// so the problem is we have changed the respones type 
// to solve this we will built middlemare --->errorHandle.middlware.js 