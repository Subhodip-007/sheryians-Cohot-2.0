import Shipment from "../models/shipment.model.js";

import Route from "../models/route.model.js";

import Recommendation
    from "../models/recommendation.model.js";

import {
    calculateRouteMetrics
} from "./routeScore.service.js";


// --------------------------------------------------
// Calculate Route Score
// --------------------------------------------------

const calculateRouteScore = ({
    averageRisk,
    maxRisk,
    averageAccessibility,
    distance,
    estimatedTime
}) => {

    const normalizedDistance =
        Math.min(
            distance / 1000,
            100
        );


    const normalizedTime =
        Math.min(
            estimatedTime / 1440,
            100
        );


    const score =
        (averageRisk * 0.25) +
        (maxRisk * 0.25) +
        ((100 - averageAccessibility) * 0.25) +
        (normalizedDistance * 0.10) +
        (normalizedTime * 0.15);


    return Math.round(
        Math.min(
            100,
            Math.max(
                0,
                score
            )
        )
    );
};


// --------------------------------------------------
// Generate Reasons
// --------------------------------------------------

const generateReasons = ({
    current,
    recommended
}) => {

    const reasons = [];


    if (
        recommended.averageRisk <
        current.averageRisk
    ) {

        reasons.push(
            `Average route risk reduced from ${current.averageRisk} to ${recommended.averageRisk}`
        );
    }


    if (
        recommended.maxRisk <
        current.maxRisk
    ) {

        reasons.push(
            `Highest-risk segment reduced from ${current.maxRisk} to ${recommended.maxRisk}`
        );
    }


    if (
        recommended.averageAccessibility >
        current.averageAccessibility
    ) {

        reasons.push(
            `Accessibility improved from ${current.averageAccessibility} to ${recommended.averageAccessibility}`
        );
    }


    if (
        recommended.route.estimatedTime >
        current.route.estimatedTime
    ) {

        reasons.push(
            `Additional travel time: ${recommended.route.estimatedTime - current.route.estimatedTime} minutes`
        );
    }


    if (
        recommended.route.estimatedTime <=
        current.route.estimatedTime
    ) {

        reasons.push(
            "No additional ETA penalty"
        );
    }


    if (
        reasons.length === 0
    ) {

        reasons.push(
            "Best available route based on current network conditions"
        );
    }


    return reasons;
};


// --------------------------------------------------
// Generate Recommendation
// --------------------------------------------------

const generateRecommendation = async (
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


    // --------------------------------------------------
    // Prevent duplicate pending recommendations
    // --------------------------------------------------

    const existingRecommendation =
        await Recommendation.findOne({

            shipment:
                shipment._id,

            status:
                "PENDING"

        });


    if (existingRecommendation) {

        return Recommendation.findById(
            existingRecommendation._id
        )

        .populate(
            "shipment",
            "trackingId status"
        )

        .populate(
            "currentRoute",
            "name distance estimatedTime mode"
        )

        .populate(
            "recommendedRoute",
            "name distance estimatedTime mode"
        );
    }


    // --------------------------------------------------
    // Validate shipment route
    // --------------------------------------------------

    if (!shipment.route) {

        const error =
            new Error(
                "Shipment does not have a route"
            );

        error.statusCode = 400;

        throw error;
    }


    const currentRouteId =
        shipment.route;


    // --------------------------------------------------
    // Calculate current route metrics
    // --------------------------------------------------

    const currentMetrics =
        await calculateRouteMetrics(
            currentRouteId
        );


    // --------------------------------------------------
    // Get current route
    // --------------------------------------------------

    const currentRoute =
        currentMetrics.route;


    // --------------------------------------------------
    // Find candidate routes
    // --------------------------------------------------

    const candidateRoutes =
        currentRoute.routeGroupId

            ? await Route.find({

                _id: {
                    $ne:
                        currentRouteId
                },

                status:
                    "ACTIVE",

                routeGroupId:
                    currentRoute.routeGroupId

            })

            : await Route.find({

                _id: {
                    $ne:
                        currentRouteId
                },

                status:
                    "ACTIVE",

                "origin.name":
                    currentRoute.origin.name,

                "destination.name":
                    currentRoute.destination.name

            });


    const candidateMetrics = [];


    // --------------------------------------------------
    // Calculate candidate route metrics
    // --------------------------------------------------

    for (
        const route
        of candidateRoutes
    ) {

        const metrics =
            await calculateRouteMetrics(
                route._id
            );


        const score =
            calculateRouteScore({

                averageRisk:
                    metrics.averageRisk,

                maxRisk:
                    metrics.maxRisk,

                averageAccessibility:
                    metrics.averageAccessibility,

                distance:
                    route.distance,

                estimatedTime:
                    route.estimatedTime

            });


        candidateMetrics.push({

            ...metrics,

            score

        });
    }


    // --------------------------------------------------
    // Calculate current route score
    // --------------------------------------------------

    const currentScore =
        calculateRouteScore({

            averageRisk:
                currentMetrics.averageRisk,

            maxRisk:
                currentMetrics.maxRisk,

            averageAccessibility:
                currentMetrics.averageAccessibility,

            distance:
                currentMetrics.route.distance,

            estimatedTime:
                currentMetrics.route.estimatedTime

        });


    // --------------------------------------------------
    // Include current route
    // --------------------------------------------------

    candidateMetrics.push({

        ...currentMetrics,

        score:
            currentScore

    });


    // --------------------------------------------------
    // Sort routes by score
    // --------------------------------------------------

    candidateMetrics.sort(
        (
            a,
            b
        ) =>
            a.score -
            b.score
    );


    const recommended =
        candidateMetrics[0];


    // --------------------------------------------------
    // Generate recommendation reasons
    // --------------------------------------------------

    const reasons =
        generateReasons({

            current:
                currentMetrics,

            recommended

        });


    // --------------------------------------------------
    // Calculate risk reduction
    // --------------------------------------------------

    const riskReduction =
        Math.max(
            0,

            currentMetrics.averageRisk -
            recommended.averageRisk
        );


    // --------------------------------------------------
    // Calculate expected delay
    // --------------------------------------------------

    const expectedDelay =
        Math.max(
            0,

            recommended.route.estimatedTime -
            currentMetrics.route.estimatedTime
        );


    // --------------------------------------------------
    // Create recommendation
    // --------------------------------------------------

    const recommendation =
        await Recommendation.create({

            shipment:
                shipment._id,

            currentRoute:
                currentRouteId,

            recommendedRoute:
                recommended.route._id,

            alternatives:
                candidateMetrics.map(
                    (
                        metric
                    ) => ({

                        route:
                            metric.route._id,

                        score:
                            metric.score,

                        riskScore:
                            metric.averageRisk,

                        accessibilityScore:
                            metric.averageAccessibility,

                        eta:
                            metric.route
                                .estimatedTime,

                        distance:
                            metric.route
                                .distance

                    })
                ),

            riskScore:
                recommended.averageRisk,

            accessibilityScore:
                recommended.averageAccessibility,

            confidence:
                Math.min(
                    100,
                    50 +
                    riskReduction
                ),

            reasons,

            expectedDelay,

            riskReduction

        });


    // --------------------------------------------------
    // Return populated recommendation
    // --------------------------------------------------

    return Recommendation.findById(
        recommendation._id
    )

    .populate(
        "shipment",
        "trackingId status"
    )

    .populate(
        "currentRoute",
        "name distance estimatedTime mode"
    )

    .populate(
        "recommendedRoute",
        "name distance estimatedTime mode"
    );
};


// --------------------------------------------------
// Exports
// --------------------------------------------------

export {

    generateRecommendation

};