import Route from "../models/route.model.js";

import {
    generateRoutes
} from "./routing/routing.service.js";

import {
    createSegmentsFromRoute
} from "./routeSegmentation.service.js";

// --------------------------------------------------
// Generate Candidate Routes
// --------------------------------------------------

const generateCandidateRoutes = async ({
    origin,
    destination,
    originName,
    destinationName,
    profile = "driving-car"
}) => {

    const routingResult =
        await generateRoutes({
            coordinates: [
                origin,
                destination
            ],
            profile,
            alternatives: true
        });

    let routeData = [];

    // -----------------------------------------
    // ORS response
    // -----------------------------------------

    if (
        routingResult.provider === "ORS"
    ) {

        routeData =
            routingResult
                .data
                .features
                .map(
                    (
                        feature,
                        index
                    ) => {

                        const summary =
                            feature
                                .properties
                                .summary;

                        return {

                            name:
                                `${originName} - ${destinationName} Option ${index + 1}`,

                            origin: {

                                name:
                                    originName,

                                location: {

                                    type:
                                        "Point",

                                    coordinates:
                                        origin
                                }
                            },

                            destination: {

                                name:
                                    destinationName,

                                location: {

                                    type:
                                        "Point",

                                    coordinates:
                                        destination
                                }
                            },

                            geometry:
                                feature.geometry,

                            distance:
                                Math.round(
                                    summary.distance /
                                    1000
                                ),

                            estimatedTime:
                                Math.round(
                                    summary.duration /
                                    60
                                ),

                            mode:
                                "ROAD",

                            status:
                                "ACTIVE"
                        };
                    }
                );
    }

    // -----------------------------------------
    // OSRM response
    // -----------------------------------------

    if (
        routingResult.provider === "OSRM"
    ) {

        routeData =
            routingResult
                .data
                .routes
                .map(
                    (
                        route,
                        index
                    ) => {

                        return {

                            name:
                                `${originName} - ${destinationName} Option ${index + 1}`,

                            origin: {

                                name:
                                    originName,

                                location: {

                                    type:
                                        "Point",

                                    coordinates:
                                        origin
                                }
                            },

                            destination: {

                                name:
                                    destinationName,

                                location: {

                                    type:
                                        "Point",

                                    coordinates:
                                        destination
                                }
                            },

                            geometry:
                                route.geometry,

                            distance:
                                Math.round(
                                    route.distance /
                                    1000
                                ),

                            estimatedTime:
                                Math.round(
                                    route.duration /
                                    60
                                ),

                            mode:
                                "ROAD",

                            status:
                                "ACTIVE"
                        };
                    }
                );
    }

    // -----------------------------------------
    // Check generated routes
    // -----------------------------------------

    if (
        routeData.length === 0
    ) {

        const error =
            new Error(
                "No candidate routes generated"
            );

        error.statusCode = 404;

        throw error;
    }

    // -----------------------------------------
    // Create routes
    // -----------------------------------------

    const createdRoutes = [];

    for (
        const data
        of routeData
    ) {

        const route =
            await Route.create(
                data
            );

        // Automatically create segments
        await createSegmentsFromRoute(
            route._id,
            15
        );

        createdRoutes.push(
            route
        );
    }

    // -----------------------------------------
    // Get complete routes
    // -----------------------------------------

    const completeRoutes = [];

    for (
        const route
        of createdRoutes
    ) {

        const completeRoute =
            await Route.findById(
                route._id
            )
            .populate(
                "segments"
            );

        completeRoutes.push(
            completeRoute
        );
    }

    // -----------------------------------------
    // Return complete routes
    // -----------------------------------------

    return {

        provider:
            routingResult.provider,

        routes:
            completeRoutes
    };
};

// --------------------------------------------------
// Export
// --------------------------------------------------

export {
    generateCandidateRoutes
};