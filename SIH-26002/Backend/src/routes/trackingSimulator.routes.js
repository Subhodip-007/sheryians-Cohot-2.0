import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    start,
    stop,
    status
} from "../controllers/trackingSimulator.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


/* =========================================================
   START
========================================================= */

router.post(
    "/shipment/:shipmentId/start",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    start
);


/* =========================================================
   STOP
========================================================= */

router.post(
    "/shipment/:shipmentId/stop",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    stop
);


/* =========================================================
   STATUS
========================================================= */

router.get(
    "/shipment/:shipmentId/status",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    status
);


export default router;