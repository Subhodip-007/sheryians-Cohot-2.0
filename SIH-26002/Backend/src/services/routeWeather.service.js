import RouteSegment from "../models/routeSegment.model.js";

import {
    getWeatherData,
    calculateWeatherRisk
} from "./weather.service.js";

import {
    calculateAccessibilityScore,
    calculateRiskScore
} from "../utils/score.js";


// --------------------------------------------------
// Update Segment Weather Risk
// --------------------------------------------------

const updateSegmentWeatherRisk = async (
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


    const [
        longitude,
        latitude
    ] = segment.startPoint.coordinates;


    const weather =
        await getWeatherData(
            latitude,
            longitude
        );


    const weatherRisk =
        calculateWeatherRisk(
            weather
        );


    segment.weatherRisk =
        weatherRisk;


    segment.accessibilityScore =
        calculateAccessibilityScore({

            roadCondition:
                segment.roadCondition,

            terrainRisk:
                segment.terrainRisk,

            slopeRisk:
                segment.slopeRisk,

            connectivity:
                segment.connectivity,

            weatherRisk,

            incidentRisk:
                segment.incidentRisk,

            vehicleSuitability:
                segment.vehicleSuitability

        });


    segment.riskScore =
        calculateRiskScore({

            roadCondition:
                segment.roadCondition,

            terrainRisk:
                segment.terrainRisk,

            slopeRisk:
                segment.slopeRisk,

            connectivity:
                segment.connectivity,

            weatherRisk,

            incidentRisk:
                segment.incidentRisk,

            vehicleSuitability:
                segment.vehicleSuitability

        });


    await segment.save();


    return {
        segment,
        weatherRisk
    };
};


export {
    updateSegmentWeatherRisk
};
