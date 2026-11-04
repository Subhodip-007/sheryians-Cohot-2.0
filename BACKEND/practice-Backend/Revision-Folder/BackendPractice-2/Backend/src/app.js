import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { handleError } from "./middlewares/error.middlemare.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter)
// is used at last
app.use(handleError)
export default app;