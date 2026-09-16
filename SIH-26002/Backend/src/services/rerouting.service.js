import Incident from "../models/incident.model.js";
import Shipment from "../models/shipment.model.js";
import Route from "../models/route.model.js";
import RouteSegment
    from "../models/routeSegment.model.js";
import {
    generateCandidateRoutes
} from "./routeGeneration.service.js";

import {
    createSegmentsFromRoute
} from "./routeSegmentation.service.js";

import {
    calculateRouteMetrics
} from "./routeScore.service.js";

import {
    generateRecommendation
} from "./recommendation.service.js";
const generateReroutingOptions = async (
    incidentId
) => {

    // ---------------------------------------------
    // Find incident
    // ---------------------------------------------

    const incident =
        await Incident.findById(
            incidentId
        );


    if (!incident) {

        const error =
            new Error(
                "Incident not found"
            );

        error.statusCode = 404;

        throw error;
    }


    // ---------------------------------------------
    // Incident must affect a segment
    // ---------------------------------------------

    if (
        !incident.affectedSegment
    ) {

        const error =
            new Error(
                "Incident is not associated with a route segment"
            );

        error.statusCode = 400;

        throw error;
    }


    // ---------------------------------------------
    // Find shipments affected
    // ---------------------------------------------

 const affectedSegment =
    await RouteSegment.findById(
        incident.affectedSegment
    );


if (!affectedSegment) {

    const error =
        new Error(
            "Affected route segment not found"
        );

    error.statusCode = 404;

    throw error;
}


const affectedShipments =
    await Shipment.find({

        route:
            affectedSegment.route,

        status: {
            $in: [
                "ASSIGNED",
                "IN_TRANSIT",
                "DELAYED",
                "AT_RISK"
            ]
        }

    });


    const results = [];


    // ---------------------------------------------
    // Generate alternatives for each shipment
    // ---------------------------------------------

    for (
        const shipment
        of affectedShipments
    ) {

        if (
            !shipment.route
        ) {
            continue;
        }


        const origin =
            shipment
                .origin
                .location
                .coordinates;


        const destination =
            shipment
                .destination
                .location
                .coordinates;


        const generated =
            await generateCandidateRoutes({

                origin,

                destination,

                originName:
                    shipment.origin.name,

                destinationName:
                    shipment.destination.name

            });


        const candidateRoutes =
            generated.routes
                .filter(
                    route =>
                        route._id.toString() !==
                        shipment.route.toString()
                );


        for (
            const candidate
            of candidateRoutes
        ) {

            await createSegmentsFromRoute(
                candidate._id,
                15
            );


            const metrics =
                await calculateRouteMetrics(
                    candidate._id
                );


            results.push({

                shipmentId:
                    shipment._id,

                trackingId:
                    shipment.trackingId,

                currentRoute:
                    shipment.route,

                candidateRoute:
                    candidate._id,

                averageRisk:
                    metrics.averageRisk,

                maxRisk:
                    metrics.maxRisk,

                averageAccessibility:
                    metrics.averageAccessibility,

                distance:
                    candidate.distance,

                estimatedTime:
                    candidate.estimatedTime

            });
        }
    }


    return results;
};
const rerouteShipment = async (
    shipmentId
) => {

    const shipment =
        await Shipment.findById(
            shipmentId
        );


    if (!shipment) {

        const error =
            new Error(
                "Shipment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    if (!shipment.route) {

        const error =
            new Error(
                "Shipment does not have a current route"
            );

        error.statusCode = 400;

        throw error;
    }


    const generated =
        await generateCandidateRoutes({

            origin:
                shipment
                    .origin
                    .location
                    .coordinates,

            destination:
                shipment
                    .destination
                    .location
                    .coordinates,

            originName:
                shipment.origin.name,

            destinationName:
                shipment.destination.name

        });


    const candidateRoutes =
        generated.routes.filter(
            route =>
                route._id.toString() !==
                shipment.route.toString()
        );


    if (
        candidateRoutes.length === 0
    ) {

        const error =
            new Error(
                "No alternative routes available"
            );

        error.statusCode = 404;

        throw error;
    }


    // ---------------------------------------------
    // Build segments for each candidate
    // ---------------------------------------------

    for (
        const route
        of candidateRoutes
    ) {

        await createSegmentsFromRoute(
            route._id,
            15
        );
    }


    // ---------------------------------------------
    // Generate Recommendation
    // ---------------------------------------------

    const recommendation =
        await generateRecommendation(
            shipment._id
        );


    return recommendation;
};


export {
    generateReroutingOptions,
      rerouteShipment
};