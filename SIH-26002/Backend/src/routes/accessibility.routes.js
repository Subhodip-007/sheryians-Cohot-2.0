import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    recalculate,
    getRouteAccessibility
} from "../controllers/accessibility.controller.js";


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
        "DRIVER",
        "FIELD_AGENT"
    ),
    recalculate
);


router.get(
    "/route/:id",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER",
        "FIELD_AGENT"
    ),
    getRouteAccessibility
);


export default router;