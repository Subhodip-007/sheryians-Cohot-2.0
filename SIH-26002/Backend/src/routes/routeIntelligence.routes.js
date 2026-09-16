import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    getIntelligence
} from "../controllers/routeIntelligence.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


router.get(
    "/:id",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER",
        "FIELD_AGENT"
    ),
    getIntelligence
);


export default router;