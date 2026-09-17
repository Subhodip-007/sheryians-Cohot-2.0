import { Router } from "express"
import { createTaskController, getTasksController } from "../controllers/task.controller";
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
taskRoute.get("/getAll",TokenVerify,taskValidator,validate,getTasksController)

let arr = [[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]]
let val = arr[1][0][1]// val = 8