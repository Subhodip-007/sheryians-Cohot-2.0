import {
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRoute,
    deleteRoute
} from "../services/route.service.js";

import {
    getRoadGeometry
} from "../services/roadRouting.service.js";


// --------------------------------------------------
// Create
// --------------------------------------------------

const create = async (
    req,
    res,
    next
) => {

    try {

        const route =
            await createRoute(
                req.body
            );


        res.status(201).json({

            success: true,

            message:
                "Route created successfully",

            route

        });

    } catch (error) {

        next(error);

    }

};


// --------------------------------------------------
// Get All
// --------------------------------------------------

const getAll = async (
    req,
    res,
    next
) => {

    try {

        const {
            mode,
            status
        } = req.query;


        const routes =
            await getAllRoutes({
                mode,
                status
            });


        res.status(200).json({

            success: true,

            count:
                routes.length,

            routes

        });

    } catch (error) {

        next(error);

    }

};


// --------------------------------------------------
// Get One
// --------------------------------------------------

const getOne = async (
    req,
    res,
    next
) => {

    try {

        const route =
            await getRouteById(
                req.params.id
            );


        res.status(200).json({

            success: true,

            route

        });

    } catch (error) {

        next(error);

    }

};


// --------------------------------------------------
// Get Real Road Geometry
// --------------------------------------------------

const getRoadRoute = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await getRoadGeometry(
                req.params.id
            );


        res.status(200).json({

            success: true,

            route: result

        });

    } catch (error) {

        next(error);

    }

};


// --------------------------------------------------
// Update
// --------------------------------------------------

const update = async (
    req,
    res,
    next
) => {

    try {

        const route =
            await updateRoute(
                req.params.id,
                req.body
            );


        res.status(200).json({

            success: true,

            message:
                "Route updated successfully",

            route

        });

    } catch (error) {

        next(error);

    }

};


// --------------------------------------------------
// Delete
// --------------------------------------------------

const remove = async (
    req,
    res,
    next
) => {

    try {

        await deleteRoute(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message:
                "Route deleted successfully"

        });

    } catch (error) {

        next(error);

    }

};


// --------------------------------------------------
// Export
// --------------------------------------------------

export {
    create,
    getAll,
    getOne,
    getRoadRoute,
    update,
    remove
};