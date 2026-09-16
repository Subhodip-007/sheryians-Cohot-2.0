import axios from "axios";


const routeApi = axios.create({

    baseURL: "http://localhost:3000/api",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }

});


export const getRoutes = async () => {

    try {

        const response =
            await routeApi.get(
                "/routes"
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch routes"
        );

    }

};


export const getRouteById = async (
    routeId
) => {

    try {

        const response =
            await routeApi.get(
                `/routes/${routeId}`
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch route"
        );

    }

};


/* =========================================================
   GET REAL ROAD GEOMETRY
========================================================= */

export const getRoadGeometry = async (
    routeId
) => {

    try {

        const response =
            await routeApi.get(
                `/routes/${routeId}/road-geometry`
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch road geometry"
        );

    }

};