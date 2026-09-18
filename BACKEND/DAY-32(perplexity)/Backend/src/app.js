import express from "express";
import { authRouter } from "./routes/auth.route.js";
import { handleError } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use(handleError);