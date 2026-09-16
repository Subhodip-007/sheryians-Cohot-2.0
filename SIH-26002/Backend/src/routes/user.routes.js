import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    createUser,
    getUsers,
    getUser,
    update,
    updateStatus,
    remove
} from "../controllers/user.controller.js";

import {
    createUserValidation
} from "../middleware/request.validation.js";

import {
    validateRequest
} from "../middleware/error.middleware.js";
const router =
    express.Router();


// ---------------------------------------
// Every user-management route requires
// authentication.
// ---------------------------------------

router.use(
    authMiddleware
);


// ---------------------------------------
// Create Driver
// ---------------------------------------

router.post(
    "/drivers",
    requireRole("ADMIN"),
    createUserValidation,
    validateRequest,
    createUser("DRIVER")
);

// ---------------------------------------
// Create Field Agent
// ---------------------------------------

router.post(
    "/field-agents",
    requireRole("ADMIN"),
    createUserValidation,
    validateRequest,
    createUser("FIELD_AGENT")
);

// ---------------------------------------
// Create Operator
// ---------------------------------------

router.post(
    "/operators",
    requireRole("ADMIN"),
    createUserValidation,
    validateRequest,
    createUser("OPERATOR")
);


// ---------------------------------------
// Get Users
// ---------------------------------------

router.get(
    "/",
    requireRole("ADMIN"),
    getUsers
);


// ---------------------------------------
// Get User
// ---------------------------------------

router.get(
    "/:id",
    requireRole("ADMIN"),
    getUser
);


// ---------------------------------------
// Update User
// ---------------------------------------

router.patch(
    "/:id",
    requireRole("ADMIN"),
    update
);


// ---------------------------------------
// Activate / Deactivate
// ---------------------------------------

router.patch(
    "/:id/status",
    requireRole("ADMIN"),
    updateStatus
);


// ---------------------------------------
// Delete User
// ---------------------------------------

router.delete(
    "/:id",
    requireRole("ADMIN"),
    remove
);


export default router;