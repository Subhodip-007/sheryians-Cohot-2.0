import Route from "../models/route.model.js";

import RouteSegment from "../models/routeSegment.model.js";

import {
    calculateAccessibilityScore,
    calculateRiskScore
} from "../utils/score.js";

import {
    calculateLineDistanceKm
} from "../utils/geo.js";

// --------------------------------------------------
// Create Route Segments From Route Geometry
// --------------------------------------------------

const createSegmentsFromRoute = async (
    routeId,
    pointsPerSegment = 15
) => {

    const route =
        await Route.findById(routeId);

    if (!route) {

        const error =
            new Error(
                "Route not found"
            );

        error.statusCode = 404;

        throw error;
    }

    if (
        !route.geometry ||
        route.geometry.type !==
            "LineString"
    ) {

        const error =
            new Error(
                "Route does not contain valid LineString geometry"
            );

        error.statusCode = 400;

        throw error;
    }

    const coordinates =
        route.geometry.coordinates;

    if (
        !coordinates ||
        coordinates.length < 2
    ) {

        const error =
            new Error(
                "Route geometry does not contain enough coordinates"
            );

        error.statusCode = 400;

        throw error;
    }

    // Remove old segments if this
    // route is being regenerated.

    if (
        route.segments &&
        route.segments.length > 0
    ) {

        await RouteSegment.deleteMany({
            route: route._id
        });

        route.segments = [];
    }

    const segments = [];

    let segmentIndex = 0;

    for (
        let i = 0;
        i < coordinates.length - 1;
        i += pointsPerSegment
    ) {

        const chunk =
            coordinates.slice(
                i,
                Math.min(
                    i + pointsPerSegment + 1,
                    coordinates.length
                )
            );

        if (
            chunk.length < 2
        ) {
            continue;
        }

        const startCoordinates =
            chunk[0];

        const endCoordinates =
            chunk[chunk.length - 1];

        // ----------------------------------------------
        // Calculate segment distance
        // ----------------------------------------------

        const segmentDistance =
            calculateLineDistanceKm(
                chunk
            );

        // ----------------------------------------------
        // Calculate segment scores
        // ----------------------------------------------

        const accessibilityScore =
            calculateAccessibilityScore({

                roadCondition: 80,

                terrainRisk: 20,

                slopeRisk: 20,

                connectivity: 80,

                weatherRisk: 0,

                incidentRisk: 0,

                vehicleSuitability: 100

            });

        const riskScore =
            calculateRiskScore({

                roadCondition: 80,

                terrainRisk: 20,

                slopeRisk: 20,

                connectivity: 80,

                weatherRisk: 0,

                incidentRisk: 0,

                vehicleSuitability: 100

            });

        // ----------------------------------------------
        // Create segment
        // ----------------------------------------------

        const segment =
            await RouteSegment.create({

                route:
                    route._id,

                segmentIndex,

                name:
                    `${route.name} - Segment ${segmentIndex + 1}`,

                startPoint: {

                    type:
                        "Point",

                    coordinates:
                        startCoordinates

                },

                endPoint: {

                    type:
                        "Point",

                    coordinates:
                        endCoordinates

                },

                geometry: {

                    type:
                        "LineString",

                    coordinates:
                        chunk

                },

                distance:
                    segmentDistance,

                roadCondition:
                    80,

                terrainRisk:
                    20,

                slopeRisk:
                    20,

                connectivity:
                    80,

                weatherRisk:
                    0,

                incidentRisk:
                    0,

                vehicleSuitability:
                    100,

                accessibilityScore,

                riskScore,

                status:
                    "OPEN"

            });

        segments.push(
            segment._id
        );

        segmentIndex++;
    }

    route.segments =
        segments;

    await route.save();

    return Route.findById(
        route._id
    )
    .populate(
        "segments"
    );
};

// --------------------------------------------------
// Export
// --------------------------------------------------

export {
    createSegmentsFromRoute
};