import Route from "../models/route.model.js";


// --------------------------------------------------
// Create Route
// --------------------------------------------------

const createRoute = async (data) => {

    const route =
        await Route.create(data);

    return route;
};


// --------------------------------------------------
// Get All Routes
// --------------------------------------------------

const getAllRoutes = async ({
    mode,
    status
} = {}) => {

    const filter = {};


    if (mode) {
        filter.mode = mode;
    }


    if (status) {
        filter.status = status;
    }


    const routes =
        await Route.find(filter)
            .sort({
                createdAt: -1
            });


    return routes;
};


// --------------------------------------------------
// Get Route By ID
// --------------------------------------------------

const getRouteById = async (
    routeId
) => {

    const route =
        await Route.findById(
            routeId
        );


    if (!route) {

        const error =
            new Error(
                "Route not found"
            );

        error.statusCode = 404;

        throw error;
    }


    return route;
};


// --------------------------------------------------
// Update Route
// --------------------------------------------------

const updateRoute = async (
    routeId,
    data
) => {

    const route =
        await Route.findByIdAndUpdate(
            routeId,
            data,
            {
                new: true,
                runValidators: true
            }
        );


    if (!route) {

        const error =
            new Error(
                "Route not found"
            );

        error.statusCode = 404;

        throw error;
    }


    return route;
};


// --------------------------------------------------
// Delete Route
// --------------------------------------------------

const deleteRoute = async (
    routeId
) => {

    const route =
        await Route.findById(
            routeId
        );


    if (!route) {

        const error =
            new Error(
                "Route not found"
            );

        error.statusCode = 404;

        throw error;
    }


    if (
        route.segments &&
        route.segments.length > 0
    ) {

        const error =
            new Error(
                "Route cannot be deleted while it contains route segments"
            );

        error.statusCode = 400;

        throw error;
    }


    await Route.findByIdAndDelete(
        routeId
    );
};


export {
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRoute,
    deleteRoute
};