import express from "express";

import authMiddleware
    from "../middleware/auth.middleware.js";

import requireRole
    from "../middleware/role.middleware.js";

import {
    create,
    getAll,
    getOne,
    getRoadRoute,
    update,
    remove
} from "../controllers/route.controller.js";


const router =
    express.Router();


/* =========================================================
   AUTH
========================================================= */

router.use(
    authMiddleware
);


/* =========================================================
   CREATE ROUTE
========================================================= */

router.post(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    create
);


/* =========================================================
   GET ALL ROUTES
========================================================= */

router.get(
    "/",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    getAll
);


/* =========================================================
   REAL ROAD GEOMETRY
========================================================= */

router.get(
    "/:id/road-geometry",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    getRoadRoute
);


/* =========================================================
   GET ONE ROUTE
========================================================= */

router.get(
    "/:id",
    requireRole(
        "ADMIN",
        "OPERATOR",
        "DRIVER"
    ),
    getOne
);


/* =========================================================
   UPDATE ROUTE
========================================================= */

router.patch(
    "/:id",
    requireRole(
        "ADMIN",
        "OPERATOR"
    ),
    update
);


/* =========================================================
   DELETE ROUTE
========================================================= */

router.delete(
    "/:id",
    requireRole(
        "ADMIN"
    ),
    remove
);


export default router;