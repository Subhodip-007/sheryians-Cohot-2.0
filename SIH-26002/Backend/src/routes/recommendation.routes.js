import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    generate,
    getAll,
    getOne,
    approve,
    reject
} from "../controllers/recommendation.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


// Generate
router.post(
    "/generate",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    generate
);


// List
router.get(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    getAll
);


// Single
router.get(
    "/:id",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    getOne
);


// Approve
router.post(
    "/:id/approve",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    approve
);


// Reject
router.post(
    "/:id/reject",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    reject
);


export default router;