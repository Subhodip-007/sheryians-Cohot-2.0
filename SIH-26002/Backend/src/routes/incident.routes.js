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
} from "../controllers/incident.controller.js";
import {
    createIncidentValidation
} from "../middleware/request.validation.js";

import {
    validateRequest
} from "../middleware/error.middleware.js";

const router =
    express.Router();


// ---------------------------------------
// Authentication required
// ---------------------------------------

router.use(
    authMiddleware
);


// ---------------------------------------
// Report Incident
// ---------------------------------------

router.post(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER",
        "FIELD_AGENT"
    ),
    createIncidentValidation,
    validateRequest,
    create
);

// ---------------------------------------
// Get Incidents
// ---------------------------------------

router.get(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER",
        "FIELD_AGENT"
    ),
    getAll
);


// ---------------------------------------
// Get One
// ---------------------------------------

router.get(
    "/:id",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER",
        "FIELD_AGENT"
    ),
    getOne
);


// ---------------------------------------
// Update / Verify
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
// Delete
// ---------------------------------------

router.delete(
    "/:id",
    requireRole(
        "ADMIN"
    ),
    remove
);


export default router;