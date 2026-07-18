const express = require('express');
const authRouret = require("./routes/auth.routes")
const app = express();

app.use(express.json())
// localhost:3000/api/auth/register
app.use("/api/auth",authRouret);
module.exports =app;