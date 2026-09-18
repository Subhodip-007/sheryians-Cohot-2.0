import { Router } from "express"
import { registerController } from "../controllers/auth.controller.js";
import { registerValidator, validate } from "../validator/auth.validator.js";
export const authRouter = Router();

authRouter.post("/register",registerValidator,validate,registerController)