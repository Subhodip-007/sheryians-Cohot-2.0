import {Router} from "express"
import { TokenVerify } from "../middlewares/auth.middleware";

export const chatRouter = Router();

chatRouter.post("message",TokenVerify,)