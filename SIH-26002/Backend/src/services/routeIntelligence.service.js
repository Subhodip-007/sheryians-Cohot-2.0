import Route from "../models/route.model.js";
import RouteSegment from "../models/routeSegment.model.js";


const getRouteIntelligence = async (
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
        })
        .sort({
            segmentIndex: 1
        });


    if (
        segments.length === 0
    ) {

        return {
            routeId,

            segmentCount: 0,

            averageRisk: 0,

            maximumRisk: 0,

            averageAccessibility: 0,

            criticalSegments: []
        };
    }


    const risks =
        segments.map(
            segment =>
                segment.riskScore
        );


    const accessibility =
        segments.map(
            segment =>
                segment.accessibilityScore
        );


    const averageRisk =
        Math.round(
            risks.reduce(
                (
                    total,
                    value
                ) =>
                    total + value,
                0
            ) /
            risks.length
        );


    const maximumRisk =
        Math.max(
            ...risks
        );


    const averageAccessibility =
        Math.round(
            accessibility.reduce(
                (
                    total,
                    value
                ) =>
                    total + value,
                0
            ) /
            accessibility.length
        );


    const criticalSegments =
        segments
            .filter(
                segment =>
                    segment.riskScore >= 80
            )
            .map(
                segment => ({
                    id: segment._id,
                    name: segment.name,
                    segmentIndex:
                        segment.segmentIndex,
                    riskScore:
                        segment.riskScore
                })
            );


    return {

        routeId,

        segmentCount:
            segments.length,

        averageRisk,

        maximumRisk,

        averageAccessibility,

        criticalSegments

    };
};


export {
    getRouteIntelligence
};