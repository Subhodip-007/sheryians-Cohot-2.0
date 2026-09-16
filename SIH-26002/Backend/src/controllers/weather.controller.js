import {
    updateSegmentWeatherRisk
} from "../services/routeWeather.service.js";


const updateWeatherRisk = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await updateSegmentWeatherRisk(
                req.params.id
            );


        res.status(200).json({

            success: true,

            message:
                "Weather risk updated successfully",

            segmentId:
                result.segment._id,

            weatherRisk:
                result.weatherRisk,

            accessibilityScore:
                result.segment.accessibilityScore,

            riskScore:
                result.segment.riskScore

        });

    } catch (error) {

        next(error);

    }
};


export {
    updateWeatherRisk
};