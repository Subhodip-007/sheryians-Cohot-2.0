const express = require("express");

const {registerContoller,loginController} = require("../controller/auth.Controller");
const authRouter = express.Router()
/**
 * @method - POST
 * @route - /api/auth/register
 * @description - user will register themselfes in the endpoint 
 * @access - // public
 */
    authRouter.post("/register",registerContoller)

    /**
 * @method - POST
 * @route - /api/auth/register
 * @description - user will register themselfes in the endpoint 
 * @access - // public
 */
    authRouter.post("/login",loginController)

    // cont with notes route
module.exports = authRouter;