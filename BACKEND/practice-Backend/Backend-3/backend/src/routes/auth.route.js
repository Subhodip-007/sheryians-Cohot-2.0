import { app } from "../app.js";
import { Router } from "express"
import { registerController } from "../controllers/auth.controller.js";
import { registerValidator, validate } from "../validator/auth.validator.js";

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
   //  authRouter.post("/login")