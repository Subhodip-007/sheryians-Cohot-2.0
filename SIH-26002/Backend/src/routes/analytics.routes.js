import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    dashboard
} from "../controllers/analytics.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


router.get(
    "/dashboard",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    dashboard
);


export default router;
