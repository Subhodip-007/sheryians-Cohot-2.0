import axios from "axios";


const riskApi = axios.create({

    baseURL: "http://localhost:3000/api",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }

});


export const getSegmentRisk = async (
    segmentId
) => {

    try {

        const response =
            await riskApi.get(
                `/risk/segment/${segmentId}`
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch segment risk"
        );

    }

};