import { app } from "../app.js";
import { Router } from "express"
import { getuserController, loginContorller, registerController } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator, validate } from "../validator/auth.validator.js";
import { TokenVerify } from "../middlewares/verifyToken.js";

export const authRouter = Router()
/**
 *  @method -"POST"
 *  @routes -"api/auth/register"
 *  @description
 */
    authRouter.post("/register",registerValidator,validate,registerController)
    /**
 *  @method -"POST"
 *  @routes -"api/auth/login"
 *  @description
 */
    authRouter.post("/login",loginValidator,validate,loginContorller)
        /**
 *  @method -"GET"
 *  @routes -"api/auth/getUser"
 *  @description
 */
authRouter.get("/getUser",TokenVerify,getuserController)
