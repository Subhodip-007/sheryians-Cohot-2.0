import axios from "axios";


const incidentApi = axios.create({

    baseURL: "http://localhost:3000/api",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }

});


/* =========================================================
   GET ALL INCIDENTS
========================================================= */

export const getIncidents = async () => {

    try {

        const response =
            await incidentApi.get(
                "/incidents"
            );

        return response.data;

    } catch (error) {

        console.error(
            "Get incidents error:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch incidents"
        );

    }

};


/* =========================================================
   GET ONE INCIDENT
========================================================= */

export const getIncidentById = async (
    incidentId
) => {

    try {

        const response =
            await incidentApi.get(
                `/incidents/${incidentId}`
            );

        return response.data;

    } catch (error) {

        console.error(
            "Get incident error:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch incident"
        );

    }

};