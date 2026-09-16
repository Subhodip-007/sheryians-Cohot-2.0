import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    updateWeatherRisk
} from "../controllers/weather.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


router.get(
    "/segment/:id",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    updateWeatherRisk
);


export default router;
