import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    updateLocation,
    updateShipment
} from "../controllers/tracking.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


/* =========================================================
   VEHICLE LOCATION
========================================================= */

router.patch(
    "/vehicle/:vehicleId/location",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    updateLocation
);


/* =========================================================
   SHIPMENT LOCATION
========================================================= */

router.patch(
    "/shipment/:shipmentId/location",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    updateShipment
);


export default router;