const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const noteRoute = require("./routes/notes.route");
const app = express()
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRouter);
app.use("/api/notes/",noteRoute)
module.exports = app;