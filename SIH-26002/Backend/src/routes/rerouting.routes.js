import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    generateOptions,
    generateForShipment
} from "../controllers/rerouting.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


// ---------------------------------------
// Incident → alternative routes
// ---------------------------------------

router.get(
    "/incident/:incidentId",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    generateOptions
);


// ---------------------------------------
// Shipment → recommendation
// ---------------------------------------

router.post(
    "/shipment/:shipmentId",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    generateForShipment
);


export default router;