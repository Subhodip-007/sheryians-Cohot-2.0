import { Router } from "express"
import { createTaskController, getTaskControllerById, getTasksController } from "../controllers/task.controller.js";
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
taskRoute.delete("/")