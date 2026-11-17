import { app } from "../app.js";
import { Router } from "express"
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { getMeController, loginController, registerController, rotateTokenController } from "../controller/auth.controller.js";
import { tokenVerify } from "../middleware/verifyToken.js";
export const authRouter = Router()
authRouter.post("/register",registerValidator,registerController);

authRouter.post("/login",loginValidator,loginController);
authRouter.get("/getMe",tokenVerify,getMeController)
authRouter.get("/rotate",rotateTokenController)