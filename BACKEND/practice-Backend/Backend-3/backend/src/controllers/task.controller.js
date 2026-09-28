import { taskModel } from "../model/task.model.js";
export const createTaskController = async (req,res,next)=>{
    try{
        const {title , description , priority} = req.body
        //      const token = req.cookies.token
        // if(!token){
        //     const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : token not found")
        //     error.statusCode = 401
        //     return next(error)
        // }
        // const user = verify(token,process.env.JWT_SECRET)
        // if(!user){
        //     const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token")
        //     error,statusCode = 401
        //     return next(error)
        // }
        if(!req.user){
            const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token")
            error.statusCode = 401
            return next(error)
        }
        const userId = req.user._id
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
        if(!req.user){
            const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token")
            error.statusCode = 401;
            return next(error)
        }
        const userId = req.user._id
        const tasks = await taskModel.find({ createdBy: userId })
        if(!tasks){
            const error = new Error("Tasks not found")
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json({
            message:"Tasks fetched successfully",
            tasks
        })

    }catch(err){
        next(err)
    }
}
export const getTaskControllerById = async(req,res,next)=>{
    try{
        if(!req.user){
               const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token")
            error.statusCode = 401;
            return next(error)
        }
         const taskId = req.params.id;
         const userId = req.user._id
         let task = await taskModel.findById(taskId);
         if(!task){
            const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "Task not found" : "bad resposn : task not found with this ID")
            error.statusCode = 404;
            return next(error)
         }  
         const isVerifiedTask = task.createdBy.equals(userId); 
         if(!isVerifiedTask){
             const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "Task not found" : "bad response : unauthorized access to other tasks")
            error.statusCode = 403;
            return next(error)
         }
          res.status(200).json({
            message:"Task fetched successfully",
            task
        })
    }catch(err){
        next(err)
    }
}
export const deleteTaskControllerById = async(req,res,next)=>{
    try{
        const taskId = req.params.id;
        if(!req.user){
           const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : invalid token");
              error.statusCode = 400;
            return next(error);  
        }
         const userId = req.user._id
        const task = await taskModel.findById(taskId)
          if(!task){
            const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "Task not found" : "bad resposn : task not found with this ID")
            error.statusCode = 400;
            return next(error)
         } 
         const isVerifiedTask = task.createdBy.equals(userId);
           if(!isVerifiedTask){
             const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "Task not found" : "bad response : unauthorized access to other tasks")
            error.statusCode = 403;
            return next(error)
         } 
         const deletedTask = await task.deleteOne();
         res.status(200).json({
            message:"task deleted successfully",
            success:true,
            deletedTask

         })
    }catch(err){
        next(err)
    }
}
//  how to count no of gen fo objects--- GC.maxGeneration how to collect obj of all gen GC.collect how to collect total alocated memory of obj GC.getTotalMemort when does a obj i elegible for GC collection - obj - no ref of not user for long time dead obj 
export const updateTaskControllerById = async (req,res,next)=>{
    try{
        if(!req.user){
            const error = new Error(NODE_ENVIRONMENT === "production" ? "unauthorized access" : "unauthorized access : token not found");
            error.statusCode(400)
            return next(error)
        }
        const userId = req.user._id
        const taskId = req.params.id
         const task = await taskModel.findById(taskId);
          if(!task){
            const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "Task not found" : "bad resposn : task not found with this ID")
            error.statusCode = 401;
            return next(error)
         }  
         const isVerifiedTask = task.createdBy.equals(userId); 
         if(!isVerifiedTask){
             const error = new Error(process.env.NODE_ENVIRONMENT === "production" ? "Task not found" : "bad response : unauthorized access to other tasks")
            error.statusCode = 403;
            return next(error)
         }
        const { title,description,priority,iscomplete} = req.body;
        task.title = title !== undefined ? title : task.title;
        task.description = description !== undefined ? description : task.description;
        task.priority = priority !== undefined ? priority : task.priority;
        task.iscomplete = iscomplete !== undefined ? iscomplete : task.iscomplete;
        const updatedTask = await task.save()
        res.status(200).json({
            message:"task update successful",
            success:true,
            updatedTask,
        })



    }catch(err){
        next(err)
    }
}