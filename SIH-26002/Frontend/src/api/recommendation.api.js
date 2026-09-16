import axios from "axios";


const recommendationApi = axios.create({

    baseURL: "http://localhost:3000/api",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }

});


/* =========================================================
   GET ALL RECOMMENDATIONS
========================================================= */

export const getRecommendations = async (
    status
) => {

    try {

        const response =
            await recommendationApi.get(
                "/recommendations",
                {
                    params: status
                        ? { status }
                        : {}
                }
            );

        return response.data;

    } catch (error) {

        console.error(
            "Get recommendations error:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch recommendations"
        );

    }

};


/* =========================================================
   GET ONE RECOMMENDATION
========================================================= */

export const getRecommendationById =
    async (
        recommendationId
    ) => {

        try {

            const response =
                await recommendationApi.get(
                    `/recommendations/${recommendationId}`
                );

            return response.data;

        } catch (error) {

            console.error(
                "Get recommendation error:",
                error
            );

            throw new Error(
                error.response?.data?.message ||
                "Unable to fetch recommendation"
            );

        }

    };


/* =========================================================
   GENERATE RECOMMENDATION
========================================================= */

export const generateRecommendation =
    async (
        shipmentId
    ) => {

        try {

            const response =
                await recommendationApi.post(
                    "/recommendations/generate",
                    {
                        shipmentId
                    }
                );

            return response.data;

        } catch (error) {

            console.error(
                "Generate recommendation error:",
                error
            );

            throw new Error(
                error.response?.data?.message ||
                "Unable to generate recommendation"
            );

        }

    };


/* =========================================================
   APPROVE
========================================================= */

export const approveRecommendation =
    async (
        recommendationId
    ) => {

        try {

            const response =
                await recommendationApi.post(
                    `/recommendations/${recommendationId}/approve`
                );

            return response.data;

        } catch (error) {

            console.error(
                "Approve recommendation error:",
                error
            );

            throw new Error(
                error.response?.data?.message ||
                "Unable to approve reroute"
            );

        }

    };


/* =========================================================
   REJECT
========================================================= */

export const rejectRecommendation =
    async (
        recommendationId
    ) => {

        try {

            const response =
                await recommendationApi.post(
                    `/recommendations/${recommendationId}/reject`
                );

            return response.data;

        } catch (error) {

            console.error(
                "Reject recommendation error:",
                error
            );

            throw new Error(
                error.response?.data?.message ||
                "Unable to reject recommendation"
            );

        }

    };