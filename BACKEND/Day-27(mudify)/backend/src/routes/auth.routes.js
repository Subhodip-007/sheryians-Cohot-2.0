const express = require("express");
const { registerController,loginController,getMeController } = require("../controller/auth.controller");
const { default: TokenVerify } = require("../middlewares/auth.middleware");
const authRoutes = express.Router();
/**
 * @method - POST
 * @route - /api/auth/register
 * @description - 
 * 
 */
 authRoutes.post("/register",registerController)
 /**
  * @method - POST
  * @route - api/auth/login
  * @description -
  */
 authRoutes.post("/login",loginController)
 /**
  * @method - POST
  * @route - api/auth/login
  * @description -
  */
 authRoutes.get("/getMe",TokenVerify,getMeController);
module.exports = authRoutes