import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    getSegmentRiskController
} from "../controllers/risk.controller.js";


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
    getSegmentRiskController
);


export default router;