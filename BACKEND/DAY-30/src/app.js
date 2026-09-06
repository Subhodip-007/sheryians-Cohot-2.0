import express from "express"
import { authRouter } from "./routes/auth.routes.js";
import { handleError } from "./middleware/erroeHandle.middleware.js";
export const app = express()
 app.use(express.json())
app.use("/api/auth",authRouter)
// is used at last
app.use(handleError)