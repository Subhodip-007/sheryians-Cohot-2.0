import {
    generateCandidateRoutes
} from "../services/routeGeneration.service.js";


const generate = async (
    req,
    res,
    next
) => {

    try {

        const {
            origin,
            destination,
            originName,
            destinationName,
            profile
        } = req.body;


        // -----------------------------------------
        // Validate origin
        // -----------------------------------------

        if (
            !Array.isArray(origin) ||
            origin.length !== 2
        ) {

            const error =
                new Error(
                    "Origin must be [longitude, latitude]"
                );

            error.statusCode = 400;

            throw error;
        }


        // -----------------------------------------
        // Validate destination
        // -----------------------------------------

        if (
            !Array.isArray(destination) ||
            destination.length !== 2
        ) {

            const error =
                new Error(
                    "Destination must be [longitude, latitude]"
                );

            error.statusCode = 400;

            throw error;
        }


        // -----------------------------------------
        // Validate names
        // -----------------------------------------

        if (
            !originName ||
            !destinationName
        ) {

            const error =
                new Error(
                    "Origin name and destination name are required"
                );

            error.statusCode = 400;

            throw error;
        }


        const result =
            await generateCandidateRoutes({

                origin,

                destination,

                originName,

                destinationName,

                profile:
                    profile ||
                    "driving-car"

            });


        res.status(201).json({

            success: true,

            message:
                "Candidate routes generated successfully",

            provider:
                result.provider,

            count:
                result.routes.length,

            routes:
                result.routes

        });

    } catch (error) {

        next(error);

    }
};


export {
    generate
};