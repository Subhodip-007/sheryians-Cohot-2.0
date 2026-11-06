import Router from "express"
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { getUserController, loginController, logoutController, registerController } from "../controllers/auth.controller.js";
import { TokenVerify } from "../middlewares/jwtVerifyToken.js";

export const authRouter = Router()
 
authRouter.post("/register",registerValidator,registerController)
authRouter.post("/login",loginValidator,loginController);
authRouter.get("/getProfile",TokenVerify,getUserController);
authRouter.post("/logout",TokenVerify,logoutController)