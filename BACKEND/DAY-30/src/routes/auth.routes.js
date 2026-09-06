
import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { body, validationResult } from "express-validator";
import { registerValidation } from "../validator/auth.validator.js";

export const authRouter = Router();

authRouter.post(
    "/register",
    // [
    //     body("username")
    //         .isString()
    //         .withMessage("username should be string"),

    //     body("email")
    //         .isEmail()
    //         .withMessage("email should be valid Email address"),

    //     (req, res, next) => {
    //         const errors = validationResult(req);

    //         if (!errors.isEmpty()) {
    //             return res.status(400).json({
    //                 errors: errors.array()
    //             });
    //         }

    //         next();
    //     }
    // ],   now this thing is created in validator folder 
    registerValidation,registerController
);

