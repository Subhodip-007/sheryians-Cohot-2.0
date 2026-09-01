const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser")
const CORS = require("cors")

const app = express();
app.use(cookieParser())
app.use(CORS({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use("/api/auth",authRoutes)
module.exports = app;