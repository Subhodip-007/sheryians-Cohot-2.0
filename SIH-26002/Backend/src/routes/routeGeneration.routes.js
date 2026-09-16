import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    generate
} from "../controllers/routeGeneration.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


router.post(
    "/generate",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    generate
);


export default router;