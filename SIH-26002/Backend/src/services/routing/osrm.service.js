import axios from "axios";

const OSRM_BASE_URL =
    "https://router.project-osrm.org/route/v1";

const getOSRMRoute = async ({
    coordinates,
    alternatives = true
}) => {

    if (
        !Array.isArray(coordinates) ||
        coordinates.length < 2
    ) {
        const error = new Error(
            "At least two coordinates are required"
        );

        error.statusCode = 400;

        throw error;
    }

    const coordinateString = coordinates
        .map(
            ([longitude, latitude]) =>
                `${longitude},${latitude}`
        )
        .join(";");

    try {

        const response = await axios.get(
            `${OSRM_BASE_URL}/driving/${coordinateString}`,
            {
                params: {
                    alternatives,
                    overview: "full",
                    geometries: "geojson"
                }
            }
        );

        if (
            response.data.code !== "Ok"
        ) {
            const error = new Error(
                response.data.message ||
                "OSRM route generation failed"
            );

            error.statusCode = 502;

            throw error;
        }

        return response.data;

    } catch (error) {

        console.error(
            "OSRM error:",
            error.response?.data ||
            error.message
        );

        if (error.statusCode) {
            throw error;
        }

        const apiError = new Error(
            "Unable to generate route from OSRM"
        );

        apiError.statusCode = 502;

        throw apiError;
    }
};

export {
    getOSRMRoute
};