const express = require("express");
const cookieparser= require("cookie-parser");
const authRoute = require("./routes/auth.routes");

const app = express();
app.use(cookieparser())
app.use(express.json());
app.use("/api/user/auth",authRoute);

 module.exports = app;