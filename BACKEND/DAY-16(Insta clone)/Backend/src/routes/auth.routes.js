const express = require("express");
const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { registerController, loginController,GetprofileController } = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middlewares");
const authRoute = express.Router();
/**
 * @route - "/api/user/auth/Register"
 * @description - used for register a user
 * @access  - "public"
 */
authRoute.post("/Register",registerController)
/**
 * @route - "/api/user/auth/Login"
 * @description - used for user login
 * @access  - "protected"
 */
authRoute.post("/Login",loginController)
 module.exports = authRoute;
 /**
 * @route - "/api/user/auth/GetProfile"
 * @description - used for fetching user info 
 * @access  - "protected"
 */
authRoute.get("/GetProfile",identifyUser,GetprofileController)
