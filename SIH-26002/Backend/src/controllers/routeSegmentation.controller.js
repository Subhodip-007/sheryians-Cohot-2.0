import {
    createSegmentsFromRoute
} from "../services/routeSegmentation.service.js";


const generateSegments = async (
    req,
    res,
    next
) => {

    try {

        const {
            pointsPerSegment
        } = req.body;


        const route =
            await createSegmentsFromRoute(

                req.params.routeId,

                pointsPerSegment ||
                    15

            );


        res.status(201).json({

            success: true,

            message:
                "Route segments generated successfully",

            count:
                route.segments.length,

            route

        });

    } catch (error) {

        next(error);

    }
};


export {
    generateSegments
};