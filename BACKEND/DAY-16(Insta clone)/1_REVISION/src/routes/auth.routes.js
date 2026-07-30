const express = require("express");
const {registerAuthController, LoginAuthController} = require("../controllers/auth.controller");
const authRouter = express.Router();

/** POST - /api/user/auth/Register */
authRouter.post("/Register",registerAuthController);
authRouter.post("/Login",LoginAuthController)
module.exports = authRouter

