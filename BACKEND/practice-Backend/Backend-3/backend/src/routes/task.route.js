import { Router } from "express"
import { createTaskController } from "../controllers/task.controller";
import { TokenVerify } from "../middlewares/verifyToken";
export const taskRoute = Router()
/**
 * @method - POST
 * @route - api/task/create
 * @description - 
 */
taskRoute.post("/create",TokenVerify,taskValidator,validate,createTaskController)
/**@abstract
 * @method - GET 
 * @route  - api/task/get 
 * @description -
 */
taskRoute.get("/get",TokenVerify,taskValidator,validate,getTasksController)