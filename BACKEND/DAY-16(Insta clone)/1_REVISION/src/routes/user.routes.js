const express = require("express");
const verifyUser = require("../middlewares/auth.middleware");
const followUpController = require("../controllers/user.controller");
const userRoute = express.Router();
userRoute.post("follow/:id",verifyUser,followUpController)
module.exports = userRoute;