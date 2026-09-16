import {
    createRouteSegment,
    getAllRouteSegments,
    getRouteSegmentById,
    updateRouteSegment,
    deleteRouteSegment
} from "../services/routeSegment.service.js";


// --------------------------------------------------
// Create
// --------------------------------------------------

const create = async (
    req,
    res,
    next
) => {

    try {

        const segment =
            await createRouteSegment({
                routeId:
                    req.params.routeId,

                data:
                    req.body
            });


        res.status(201).json({

            success: true,

            message:
                "Route segment created successfully",

            segment

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

        const segments =
            await getAllRouteSegments(
                req.params.routeId
            );


        res.status(200).json({

            success: true,

            count: segments.length,

            segments

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

        const segment =
            await getRouteSegmentById(
                req.params.id
            );


        res.status(200).json({

            success: true,

            segment

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

        const segment =
            await updateRouteSegment(
                req.params.id,
                req.body
            );


        res.status(200).json({

            success: true,

            message:
                "Route segment updated successfully",

            segment

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

        await deleteRouteSegment(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message:
                "Route segment deleted successfully"

        });

    } catch (error) {

        next(error);

    }
};


export {
    create,
    getAll,
    getOne,
    update,
    remove
};