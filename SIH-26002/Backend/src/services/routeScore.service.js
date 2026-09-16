import Route from "../models/route.model.js";
import RouteSegment from "../models/routeSegment.model.js";


// --------------------------------------------------
// Calculate Route Metrics
// --------------------------------------------------

const calculateRouteMetrics = async (
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


    const segments =
        await RouteSegment.find({
            route: routeId
        });


    if (
        segments.length === 0
    ) {

        return {
            route,
            averageRisk: 0,
            averageAccessibility: 100,
            maxRisk: 0
        };
    }


    const totalRisk =
        segments.reduce(
            (
                total,
                segment
            ) =>
                total +
                segment.riskScore,
            0
        );


    const totalAccessibility =
        segments.reduce(
            (
                total,
                segment
            ) =>
                total +
                segment.accessibilityScore,
            0
        );


    const maxRisk =
        Math.max(
            ...segments.map(
                (
                    segment
                ) =>
                    segment.riskScore
            )
        );


    const averageRisk =
        Math.round(
            totalRisk /
            segments.length
        );


    const averageAccessibility =
        Math.round(
            totalAccessibility /
            segments.length
        );


    return {
        route,

        averageRisk,

        averageAccessibility,

        maxRisk
    };
};


export {
    calculateRouteMetrics
};
