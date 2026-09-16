import RouteSegment from "../models/routeSegment.model.js";
import Route from "../models/route.model.js";


// --------------------------------------------------
// Create Route Segment
// --------------------------------------------------

const createRouteSegment = async ({
    routeId,
    data = {}
}) => {

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


    /* --------------------------------------------------
       Find next segment index
    -------------------------------------------------- */

    const lastSegment =
        await RouteSegment
            .findOne({
                route: routeId
            })
            .sort({
                segmentIndex: -1
            });


    const nextSegmentIndex =
        lastSegment
            ? lastSegment.segmentIndex + 1
            : 0;


    /* --------------------------------------------------
       Extract explicit segment index
    -------------------------------------------------- */

    const {
        segmentIndex,
        ...segmentData
    } = data;


    /* --------------------------------------------------
       Final index
    -------------------------------------------------- */

    const finalSegmentIndex =
        Number.isInteger(
            segmentIndex
        )
            ? segmentIndex
            : nextSegmentIndex;


    /* --------------------------------------------------
       Create segment
    -------------------------------------------------- */

    const segment =
        await RouteSegment.create({

            route:
                routeId,

            segmentIndex:
                finalSegmentIndex,

            ...segmentData

        });


    /* --------------------------------------------------
       Attach segment to route
    -------------------------------------------------- */

    route.segments =
        route.segments || [];


    route.segments.push(
        segment._id
    );


    await route.save();


    return segment;

};

// --------------------------------------------------
// Get All Segments
// --------------------------------------------------

const getAllRouteSegments = async (
    routeId
) => {

    const route =
        await Route.findById(routeId);


    if (!route) {

        const error = new Error(
            "Route not found"
        );

        error.statusCode = 404;

        throw error;
    }


    const segments =
        await RouteSegment.find({
            route: routeId
        })
        .sort({
            createdAt: 1
        });


    return segments;
};


// --------------------------------------------------
// Get One Segment
// --------------------------------------------------

const getRouteSegmentById = async (
    segmentId
) => {

    const segment =
        await RouteSegment.findById(
            segmentId
        );


    if (!segment) {

        const error = new Error(
            "Route segment not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return segment;
};


// --------------------------------------------------
// Update Segment
// --------------------------------------------------

const updateRouteSegment = async (
    segmentId,
    data
) => {

    const segment =
        await RouteSegment.findByIdAndUpdate(
            segmentId,
            data,
            {
                new: true,
                runValidators: true
            }
        );


    if (!segment) {

        const error = new Error(
            "Route segment not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return segment;
};


// --------------------------------------------------
// Delete Segment
// --------------------------------------------------

const deleteRouteSegment = async (
    segmentId
) => {

    const segment =
        await RouteSegment.findById(
            segmentId
        );


    if (!segment) {

        const error = new Error(
            "Route segment not found"
        );

        error.statusCode = 404;

        throw error;
    }


    await RouteSegment.findByIdAndDelete(
        segmentId
    );


    await Route.findByIdAndUpdate(
        segment.route,
        {
            $pull: {
                segments: segment._id
            }
        }
    );
};


export {
    createRouteSegment,
    getAllRouteSegments,
    getRouteSegmentById,
    updateRouteSegment,
    deleteRouteSegment
};