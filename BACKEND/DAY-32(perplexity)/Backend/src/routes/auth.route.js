import { Router } from "express"
import { getUserController, loginController, registerController, verifyEmailController } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator, validate } from "../validator/auth.validator.js";
import { TokenVerify } from "../middlewares/auth.middleware.js";
export const authRouter = Router();
/**
 * @methor -/api/auth/register
 * @route -POST 
 * @description - 
 *  
 */
authRouter.post("/register",registerValidator,validate,registerController)
/**
 * @methor -/api/auth/verifyEmail
 * @route -GET
 * @description - 
 *  
 */
authRouter.get("/verify-email", verifyEmailController)
/**
 * @methor -/api/auth/login
 * @route -POST 
 * @description - 
 *  
 */
authRouter.post("/login",loginValidator,validate,loginController)
/**
 * @methor -/api/auth/getUser
 * @route -GET 
 * @description - 
 *  
 */
authRouter.get("/getUser",TokenVerify,getUserController)