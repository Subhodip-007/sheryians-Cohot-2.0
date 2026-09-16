import cron from "node-cron";

import RouteSegment
    from "../models/routeSegment.model.js";

import {
    updateSegmentWeatherRisk
} from "./routeWeather.service.js";


const updateWeatherForAllSegments =
    async () => {

        try {

            const segments =
                await RouteSegment.find({
                    status: {
                        $ne: "BLOCKED"
                    }
                });


            console.log(
                `Updating weather for ${segments.length} segments`
            );


            for (
                const segment
                of segments
            ) {

                try {

                    await updateSegmentWeatherRisk(
                        segment._id
                    );

                } catch (error) {

                    console.error(
                        `Weather update failed for segment ${segment._id}:`,
                        error.message
                    );
                }
            }

        } catch (error) {

            console.error(
                "Weather update failed:",
                error.message
            );
        }
    };


const startWeatherScheduler = async () => {

    // Initial update
    await updateWeatherForAllSegments();


    // Every 30 minutes
    cron.schedule(
        "0 */30 * * * *",
        async () => {

            console.log(
                "Starting scheduled weather update..."
            );

            await updateWeatherForAllSegments();

            console.log(
                "Scheduled weather update completed"
            );
        }
    );


    console.log(
        "Weather scheduler started"
    );
};


export {
    startWeatherScheduler
};