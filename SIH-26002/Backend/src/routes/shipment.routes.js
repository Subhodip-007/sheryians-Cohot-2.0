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
} from "../controllers/shipment.controller.js";
import {
    createShipmentValidation
} from "../middleware/request.validation.js";

import {
    validateRequest
} from "../middleware/error.middleware.js";

const router =
    express.Router();


router.use(
    authMiddleware
);


// ---------------------------------------
// Create Shipment
// ---------------------------------------

router.post(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    createShipmentValidation,
    validateRequest,
    create
);


// ---------------------------------------
// Get All Shipments
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
// Get One Shipment
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
// Update Shipment
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
// Delete Shipment
// ---------------------------------------

router.delete(
    "/:id",
    requireRole(
        "ADMIN"
    ),
    remove
);


export default router;