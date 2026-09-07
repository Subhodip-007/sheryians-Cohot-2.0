import { app } from "../app.js";
import { Router } from "express"
export const authRouter = Router
/**
 *  @method -"POST"
 *  @routes -"api/auth/register"
 *  @description
 */
authRouter.post("/register")