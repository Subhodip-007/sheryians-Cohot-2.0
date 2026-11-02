import {Router} from "express"
import { registerValidator } from "../validator/auth.validator.js";
import { loginController, registerController, verifyEmailController } from "../controllers/auth.controller.js";
export const authRouter = Router();
/**
 * @methor -/api/auth/register
 * @route -POST 
 * @description - 
 *  
 */
authRouter.post("/register", registerValidator,registerController)
authRouter.get("/verify-email",verifyEmailController);
authRouter.post("/login",loginController)