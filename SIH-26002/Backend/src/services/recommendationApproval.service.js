import Recommendation
    from "../models/recommendation.model.js";

import Shipment
    from "../models/shipment.model.js";

import Vehicle
    from "../models/vehicle.model.js";

import RouteSegment
    from "../models/routeSegment.model.js";


// --------------------------------------------------
// Approve Recommendation
// --------------------------------------------------

const approveRecommendation = async (
    recommendationId
) => {

    const recommendation =
        await Recommendation.findById(
            recommendationId
        );


    if (!recommendation) {

        const error =
            new Error(
                "Recommendation not found"
            );

        error.statusCode = 404;

        throw error;
    }


    if (
        recommendation.status !==
        "PENDING"
    ) {

        const error =
            new Error(
                "Recommendation is no longer pending"
            );

        error.statusCode = 400;

        throw error;
    }


    const shipment =
        await Shipment.findById(
            recommendation.shipment
        );


    if (!shipment) {

        const error =
            new Error(
                "Shipment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    // ----------------------------------------------
    // Store old vehicle
    // ----------------------------------------------

    const oldVehicleId =
        shipment.vehicle;


    // ----------------------------------------------
    // Find first segment of new route
    // ----------------------------------------------

    const firstSegment =
        await RouteSegment.findOne({
            route:
                recommendation.recommendedRoute
        })
        .sort({
            segmentIndex: 1
        });


    // ----------------------------------------------
    // Update shipment
    // ----------------------------------------------

    shipment.route =
        recommendation.recommendedRoute;


    shipment.currentSegment =
        firstSegment
            ? firstSegment._id
            : null;


    shipment.status =
        "ASSIGNED";


    await shipment.save();


    // ----------------------------------------------
    // Update recommendation
    // ----------------------------------------------

    recommendation.status =
        "APPROVED";


    await recommendation.save();


    // ----------------------------------------------
    // Update vehicle
    // ----------------------------------------------

    if (oldVehicleId) {

        await Vehicle.findByIdAndUpdate(
            oldVehicleId,
            {
                $set: {
                    currentShipment:
                        shipment._id,

                    status:
                        "ASSIGNED"
                }
            }
        );
    }


    return {
        recommendation,
        shipment
    };
};


// --------------------------------------------------
// Reject Recommendation
// --------------------------------------------------

const rejectRecommendation = async (
    recommendationId
) => {

    const recommendation =
        await Recommendation.findById(
            recommendationId
        );


    if (!recommendation) {

        const error =
            new Error(
                "Recommendation not found"
            );

        error.statusCode = 404;

        throw error;
    }


    if (
        recommendation.status !==
        "PENDING"
    ) {

        const error =
            new Error(
                "Recommendation is no longer pending"
            );

        error.statusCode = 400;

        throw error;
    }


    recommendation.status =
        "REJECTED";


    await recommendation.save();


    return recommendation;
};


export {
    approveRecommendation,
    rejectRecommendation
};