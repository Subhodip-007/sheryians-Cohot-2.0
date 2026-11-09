import express from "express";
import { authRouter } from "./routes/auth.route.js";
import { handleError } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors"
import { chatRouter } from "./routes/chats.route.js";
export const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    //methods ["GET",...]
}))
app.use("/api/auth", authRouter);
app.use("/api/chats",chatRouter)

app.use(handleError);