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
    assign,
    unassign,
    remove
} from "../controllers/vehicle.controller.js";
import {
    createVehicleValidation
} from "../middleware/request.validation.js";

import {
    validateRequest
} from "../middleware/error.middleware.js";


const router =
    express.Router();


// ---------------------------------------
// Authentication required for everything
// ---------------------------------------

router.use(
    authMiddleware
);


// ---------------------------------------
// Create vehicle
// ADMIN / OPERATOR
// ---------------------------------------
router.post(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    createVehicleValidation,
    validateRequest,
    create
);


// ---------------------------------------
// Get vehicles
// ADMIN / OPERATOR / DRIVER
// ---------------------------------------

router.get(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    getAll
);


// ---------------------------------------
// Get single vehicle
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
// Update vehicle
// ADMIN / OPERATOR
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
// Assign driver
// ADMIN / OPERATOR
// ---------------------------------------

router.patch(
    "/:id/driver",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    assign
);


// ---------------------------------------
// Unassign driver
// ADMIN / OPERATOR
// ---------------------------------------

router.delete(
    "/:id/driver",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    unassign
);


// ---------------------------------------
// Delete vehicle
// ADMIN only
// ---------------------------------------

router.delete(
    "/:id",
    requireRole(
        "ADMIN"
    ),
    remove
);


export default router;