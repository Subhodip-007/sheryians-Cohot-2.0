const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieparser = require("cookie-parser")
const app = express();
app.use(express.json());
app.use(cookieparser())
app.use("/api/user/auth",authRouter);
module.exports = app;
