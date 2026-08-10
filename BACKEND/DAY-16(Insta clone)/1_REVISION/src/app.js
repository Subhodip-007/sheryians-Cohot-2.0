const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieparser = require("cookie-parser");
const postRoute = require("./routes/post.routes");
const userRoute = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use(cookieparser())
app.use("/api/user/auth",authRouter);
app.use("/api/user/posts",postRoute);
app.use("/api/user",userRoute);
module.exports = app;
