import { Router } from "express"
import { createTaskController, getTaskControllerById, getTasksController, deleteTaskControllerById,updateTaskControllerById, filterTaskController } from "../controllers/task.controller.js";
import { TokenVerify } from "../middlewares/verifyToken.js";
import { taskValidator, validate } from "../validator/task.validator.js";
export const taskRoute = Router()
/**
 * @method - POST
 * @route - api/task/create
 * @description - 
 */
taskRoute.post("/create",TokenVerify,taskValidator,validate,createTaskController)
/**
 * @method - GET 
 * @route  - api/task/get 
 * @description -
 */
taskRoute.get("/getAll",TokenVerify,getTasksController)
/**
 * @method - GET 
 * @route  - api/task/getById 
 * @description -
 */
taskRoute.get("/get/:id",TokenVerify,getTaskControllerById)
/**
 * @method - DELETE 
 * @route  - api/task/delete/:id 
 * @description -
 */
taskRoute.delete("/delete/:id",TokenVerify,deleteTaskControllerById)
/**
 * @method - PATCH 
 * @route  - api/task/update/:id 
 * @description -
 */
taskRoute.patch("/update/:id",TokenVerify,updateTaskControllerById)
//  for deleteall try implemention of drop 

/**
 * @method - PATCH 
 * @route  - api/task/find/:query 
 * @description -
 */
taskRoute.get("/findby",TokenVerify,filterTaskController)