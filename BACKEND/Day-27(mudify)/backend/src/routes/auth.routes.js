const express = require("express");
const { registerController,loginController,getMeController,logoutController } = require("../controller/auth.controller");
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
  * @method - GET
  * @route - api/auth/getMe
  * @description -
  */
 authRoutes.get("/getMe",TokenVerify,getMeController);
  /**
  * @method - GET
  * @route - api/auth/logout
  * @description -
  */
 authRoutes.get("/logout",TokenVerify,logoutController)
module.exports = authRoutes