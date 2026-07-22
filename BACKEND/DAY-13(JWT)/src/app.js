const express = require('express');
const authRouret = require("./routes/auth.routes")
const cookieparser= require("cookie-parser");
const app = express();
app.use(cookieparser())
app.use(express.json())
// localhost:3000/api/auth/register
app.use("/api/auth",authRouret);
module.exports =app;