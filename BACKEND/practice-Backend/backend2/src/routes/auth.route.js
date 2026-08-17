const express = require("express");
const app = require("../app");
const registerContoller = require("../controller/auth.Controller");
let authRouter = app.use(express.Router());
/**
 * @method - POST
 * @route - /api/auth/register
 * @description - user will register themselfes in the endpoint 
 * @access - // public
 */
    authRouter.post("/register",registerContoller)// continue with auth controller 
module.exports = authRouter;