import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    analyze,
    apply
} from "../controllers/shipmentImpact.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


// --------------------------------------------------
// Analyze incident impact
// --------------------------------------------------

router.get(
    "/incident/:incidentId",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    analyze
);


// --------------------------------------------------
// Apply impact
// --------------------------------------------------

router.post(
    "/incident/:incidentId/apply",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    apply
);


export default router;