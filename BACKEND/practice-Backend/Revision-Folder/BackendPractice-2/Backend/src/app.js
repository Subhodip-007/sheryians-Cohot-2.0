import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { handleError } from "./middlewares/error.middlemare.js";
import cookieParser from "cookie-parser";
import { notesRouter } from "./routes/notes.routes.js";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/api/notes",notesRouter)
// is used at last
app.use(handleError)
export default app;