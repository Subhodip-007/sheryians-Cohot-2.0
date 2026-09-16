import RouteSegment from "../models/routeSegment.model.js";

import {
    calculateAccessibilityScore,
    calculateRiskScore,
    getRiskLevel
} from "../utils/score.js";


// --------------------------------------------------
// Recalculate Segment Scores
// --------------------------------------------------

const recalculateSegmentScores = async (
    segmentId
) => {

    const segment =
        await RouteSegment.findById(
            segmentId
        );


    if (!segment) {

        const error =
            new Error(
                "Route segment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    const accessibilityScore =
        calculateAccessibilityScore({

            roadCondition:
                segment.roadCondition,

            terrainRisk:
                segment.terrainRisk,

            slopeRisk:
                segment.slopeRisk,

            connectivity:
                segment.connectivity,

            weatherRisk:
                segment.weatherRisk,

            incidentRisk:
                segment.incidentRisk,

            vehicleSuitability:
                segment.vehicleSuitability

        });


    const riskScore =
        calculateRiskScore({

            roadCondition:
                segment.roadCondition,

            terrainRisk:
                segment.terrainRisk,

            slopeRisk:
                segment.slopeRisk,

            connectivity:
                segment.connectivity,

            weatherRisk:
                segment.weatherRisk,

            incidentRisk:
                segment.incidentRisk,

            vehicleSuitability:
                segment.vehicleSuitability

        });


    segment.accessibilityScore =
        accessibilityScore;

    segment.riskScore =
        riskScore;


    await segment.save();


    return {
        segment,
        accessibilityScore,
        riskScore,
        riskLevel:
            getRiskLevel(
                riskScore
            )
    };
};
const calculateRouteAccessibility = async (
    routeId
) => {

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
            accessibilityScore: 0,
            riskScore: 0
        };
    }


    const accessibilityTotal =
        segments.reduce(
            (
                total,
                segment
            ) =>
                total +
                segment.accessibilityScore,
            0
        );


    const riskTotal =
        segments.reduce(
            (
                total,
                segment
            ) =>
                total +
                segment.riskScore,
            0
        );


    const maxRisk =
        Math.max(
            ...segments.map(
                segment =>
                    segment.riskScore
            )
        );


    return {

        routeId,

        segmentCount:
            segments.length,

        accessibilityScore:
            Math.round(
                accessibilityTotal /
                segments.length
            ),

        riskScore:
            Math.round(
                riskTotal /
                segments.length
            ),

        maxRisk
    };
};


export {
    recalculateSegmentScores,
    calculateRouteAccessibility
};