import express from "express";

import {
    register,
    login,
    getMe,
    logout
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    registerValidation,
    loginValidation
} from "../middleware/auth.validation.js";

import {
    validateRequest
} from "../middleware/error.middleware.js";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validateRequest,
    register
);

router.post(
    "/login",
    loginValidation,
    validateRequest,
    login
);

router.get(
    "/me",
    authMiddleware,
    getMe
);

router.post(
    "/logout",
    logout
);

export default router;