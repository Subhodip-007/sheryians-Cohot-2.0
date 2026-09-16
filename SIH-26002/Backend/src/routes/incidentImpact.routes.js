import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    processImpact
} from "../controllers/incidentImpact.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


router.post(
    "/incident/:incidentId/process",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    processImpact
);


export default router;