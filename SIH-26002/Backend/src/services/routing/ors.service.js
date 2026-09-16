import axios from "axios";

const ORS_BASE_URL =
    "https://api.heigit.org/openrouteservice/v2/directions";

const getORSRoute = async ({
    coordinates,
    profile = "driving-car",
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

    try {

        const requestBody = {
            coordinates
        };

        if (alternatives) {
            requestBody.alternative_routes = {
                target_count: 3,
                share_factor: 0.6,
                weight_factor: 1.4
            };
        }

        const response = await axios.post(
            `${ORS_BASE_URL}/${profile}/geojson`,
            requestBody,
            {
                headers: {
                    Authorization:
                        process.env.ORS_API_KEY,

                    "Content-Type":
                        "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "OpenRouteService error:",
            error.response?.data ||
            error.message
        );

        const apiError = new Error(
            "Unable to generate route from OpenRouteService"
        );

        apiError.statusCode =
            error.response?.status === 401
                ? 401
                : 502;

        throw apiError;
    }
};

export {
    getORSRoute
};