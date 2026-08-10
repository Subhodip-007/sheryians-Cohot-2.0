const express = require("express");
const verifyUser = require("../middlewares/auth.middleware");
const {followUpController,GetAllRequest} = require("../controllers/user.controller");
const userRoute = express.Router();
userRoute.post("/follow/:id",verifyUser,followUpController)
userRoute.get("/follow/AllRequest",verifyUser,GetAllRequest)
userRoute.patch("/followRequest/accept/:id",verifyUser,)
module.exports = userRoute;