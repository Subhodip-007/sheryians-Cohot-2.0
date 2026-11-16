import express from "express"
import morgan from "morgan"
import { authRouter } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"
import { handleError } from "./middleware/errorHandle.middleware.js";
export const app = express();

app.use(express.json()) 
app.use(cookieParser())
app.use(morgan());
app.use("/api/auth",authRouter)
app.use(handleError)