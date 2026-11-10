import {Router} from "express"
import { TokenVerify } from "../middlewares/auth.middleware.js";
import { deleteChat, getChats, getMessages, sendMessageController } from "../controllers/chat.controller.js";

export const chatRouter = Router();

chatRouter.post("/message",TokenVerify,sendMessageController)

chatRouter.get("/chats", TokenVerify, getChats);
chatRouter.get("/:chatId/messages", TokenVerify, getMessages);
chatRouter.delete("/delete/:chatId", TokenVerify, deleteChat);
// if u many to keed backup of chat apply false delete