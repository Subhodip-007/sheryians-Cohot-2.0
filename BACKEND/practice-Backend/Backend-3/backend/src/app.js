import express from "express"
import { authRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser"
import { handleError } from "./middlewares/errorHandle.middleware.js";
import { taskRoute } from "./routes/task.route.js";
export const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/task",taskRoute)
// place error middleware last
app.use(handleError)