const experss = require("express");
const app = require("../app");
const jwt  = require("jsonwebtoken");
const { registerController, loginController, logoutController,GetProfileController } = require("../controllers/auth.controller");
const authRouter = experss.Router()
/**
 * @route -/api/auth/register
 * @description - user for register a user 
 * @access - "public"
 */
authRouter.post("/register",registerController)
/**
 * @route -/api/auth/login
 * @description - api used for user to login 
 * @access - "protected"
 */
authRouter.post("/login",loginController)
module.exports = authRouter

/**
 * @route -/api/auth/GetProfile
 * @description - api used for user to logout 
 * @access - "protected"
 */
authRouter.get("/GetProfile",GetProfileController)

/**
 * @route -/api/auth/logout
 * @description - api used for user to logout 
 * @access - "protected"
 */
authRouter.post("/logout",logoutController)