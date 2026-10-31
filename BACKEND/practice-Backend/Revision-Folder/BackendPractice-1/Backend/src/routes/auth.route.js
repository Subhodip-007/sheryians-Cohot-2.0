import express from "express";
import {getProfile, loginController, logoutcontroller, registerController} from "../controllers/auth.controller.js";

const authRouter = express.Router()
authRouter.post("/register",registerController);
authRouter.post("/login",loginController);
authRouter.get("/getProfile",getProfile);
authRouter.post("/logout",logoutcontroller)
export default authRouter;