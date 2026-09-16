import { taskModel } from "../model/task.model";
export const createTaskController = async (req,res,next)=>{
    try{
        const {title , description , priority} = req.body
        //      const token = req.cookies.token
        // if(!token){
        //     const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : token not found")
        //     error.statusCode = 401
        //     return next(error)
        // }
        // const verifyToken = verify(token,process.env.JWT_SECRET)
        // if(!verifyToken){
        //     const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token")
        //     error,statusCode = 401
        //     return next(error)
        // }
        if(!req.verifyToken){
            const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token")
            error.statusCode = 401
            return next(error)
        }
        const userId = req.verifyToken._id
        if (!title || title.trim() === "") {
            const error = new Error("Task title can't be empty")
            error.statusCode = 400
            return next(error)
        }
        const task = await taskModel.create({
            title,
            description,
            priority,
            createdBy:userId

        })
        res.status(200).json({
            message:"task creation successfull",
            task
        })



    }catch(err){
        next(err)
    }
}
export const getTasksController = async(req,res,next)=>{
    try{
        

    }catch(err){
        next(err)
    }
}