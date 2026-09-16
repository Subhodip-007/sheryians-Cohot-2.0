import {
    getORSRoute
} from "./ors.service.js";

import {
    getOSRMRoute
} from "./osrm.service.js";


const generateRoutes = async ({
    coordinates,
    profile = "driving-car",
    alternatives = true
}) => {

    try {

        const result =
            await getORSRoute({
                coordinates,
                profile,
                alternatives
            });

        return {
            provider: "ORS",
            data: result
        };

    } catch (orsError) {

        console.error(
            "ORS failed. Trying OSRM fallback..."
        );

        try {

            const fallback =
                await getOSRMRoute({
                    coordinates,
                    alternatives
                });

            return {
                provider: "OSRM",
                data: fallback
            };

        } catch (osrmError) {

            const error =
                new Error(
                    "All routing providers failed"
                );

            error.statusCode = 502;

            throw error;
        }
    }
};


export {
    generateRoutes
};