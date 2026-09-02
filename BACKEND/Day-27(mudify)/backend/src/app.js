const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser")
const CORS = require("cors");
const songRouter = require("./routes/song.routes");

const app = express();
app.use(cookieParser())
app.use(CORS({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/songs",songRouter)
module.exports = app;