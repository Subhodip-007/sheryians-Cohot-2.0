import {Router} from "express"
import { registerValidator } from "../validator/auth.validator.js";
import { registerController } from "../controllers/auth.controller.js";
export const authRouter = Router();
/**
 * @methor -/api/auth/register
 * @route -POST 
 * @description - 
 *  
 */
authRouter.post("/register", registerValidator,registerController)