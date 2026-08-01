const express = require("express");
const cookieparser= require("cookie-parser");
const authRoute = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRoute = require("./routes/user.routes");

const app = express();
app.use(cookieparser())
app.use(express.json()); // for raw format 

app.use("/api/user/auth",authRoute);
app.use("/api/user",postRouter)
app.use("/api/user",userRoute)

 module.exports = app;