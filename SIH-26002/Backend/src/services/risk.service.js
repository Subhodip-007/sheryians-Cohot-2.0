import RouteSegment from "../models/routeSegment.model.js";

import {
    calculateRiskScore,
    getRiskLevel
} from "../utils/score.js";


// --------------------------------------------------
// Get Segment Risk
// --------------------------------------------------

const getSegmentRisk = async (
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


    return {
        segmentId:
            segment._id,

        riskScore,

        riskLevel:
            getRiskLevel(
                riskScore
            ),

        factors: {

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

        }
    };
};


export {
    getSegmentRisk
};