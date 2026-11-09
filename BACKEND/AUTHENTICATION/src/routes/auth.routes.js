import {Router} from "express"
import { getMeController, refreshTokenController, registerController } from "../controllers/auth.controller.js";

export const authRouter = Router()

/**
 * register
 */ 
authRouter.post("/register",registerController)
authRouter.get("/getMe",getMeController)
authRouter.get("/refreshToken",refreshTokenController)