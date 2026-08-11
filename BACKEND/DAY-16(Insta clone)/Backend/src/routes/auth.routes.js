const express = require("express");
const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { registerController, loginController } = require("../controllers/auth.controller");
const authRoute = express.Router();

authRoute.post("/Register",registerController)

authRoute.post("/Login",loginController)
 module.exports = authRoute;