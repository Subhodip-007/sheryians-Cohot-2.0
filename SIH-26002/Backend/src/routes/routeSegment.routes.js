import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    create,
    getAll,
    getOne,
    update,
    remove
} from "../controllers/routeSegment.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


// ---------------------------------------
// Create segment
// ---------------------------------------

router.post(
    "/route/:routeId",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    create
);


// ---------------------------------------
// Get all segments for route
// ---------------------------------------

router.get(
    "/route/:routeId",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    getAll
);


// ---------------------------------------
// Get segment
// ---------------------------------------

router.get(
    "/:id",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    getOne
);


// ---------------------------------------
// Update segment
// ---------------------------------------

router.patch(
    "/:id",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    update
);


// ---------------------------------------
// Delete segment
// ---------------------------------------

router.delete(
    "/:id",
    requireRole(
        "ADMIN"
    ),
    remove
);


export default router;