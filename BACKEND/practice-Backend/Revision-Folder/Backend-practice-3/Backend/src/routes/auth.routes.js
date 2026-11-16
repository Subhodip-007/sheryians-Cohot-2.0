import { app } from "../app.js";
import { Router } from "express"
import { registerValidator } from "../validator/auth.validator.js";
import { registerController } from "../controller/auth.controller.js";
export const authRouter = Router()
authRouter.post("/register",registerValidator,registerController)