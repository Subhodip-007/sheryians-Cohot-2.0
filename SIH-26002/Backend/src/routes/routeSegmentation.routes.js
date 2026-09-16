import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    generateSegments
} from "../controllers/routeSegmentation.controller.js";


const router =
    express.Router();


router.use(
    authMiddleware
);


router.post(
    "/route/:routeId/generate",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    generateSegments
);


export default router;