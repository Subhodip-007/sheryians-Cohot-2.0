const express = require("express");
const connectToDb = require("./config/database");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
connectToDb()
app.use("/api/authentication",authRoute)
module.exports = app;
