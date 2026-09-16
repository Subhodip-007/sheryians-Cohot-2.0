import axios from "axios";

import {
    getRouteById
} from "./route.service.js";


const OSRM_BASE_URL =
    "https://router.project-osrm.org/route/v1/driving";


const getRoadGeometry = async (
    routeId
) => {

    /*
     * Get the existing route from MongoDB.
     */

    const route =
        await getRouteById(routeId);


    if (!route) {

        const error =
            new Error(
                "Route not found"
            );

        error.statusCode = 404;

        throw error;
    }


    const originCoordinates =
        route
            ?.origin
            ?.location
            ?.coordinates;


    const destinationCoordinates =
        route
            ?.destination
            ?.location
            ?.coordinates;


    if (
        !Array.isArray(
            originCoordinates
        ) ||
        originCoordinates.length < 2 ||
        !Array.isArray(
            destinationCoordinates
        ) ||
        destinationCoordinates.length < 2
    ) {

        const error =
            new Error(
                "Route does not contain valid origin and destination coordinates"
            );

        error.statusCode = 400;

        throw error;
    }


    const [
        originLongitude,
        originLatitude
    ] = originCoordinates;


    const [
        destinationLongitude,
        destinationLatitude
    ] = destinationCoordinates;


    /*
     * OSRM expects:
     *
     * longitude,latitude
     */

    const coordinates =
        `${originLongitude},${originLatitude};` +
        `${destinationLongitude},${destinationLatitude}`;


    const url =
        `${OSRM_BASE_URL}/${coordinates}`;


    const response =
        await axios.get(
            url,
            {
                params: {
                    overview: "full",
                    geometries: "geojson",
                    steps: false
                },

                timeout: 15000
            }
        );


    if (
        !response.data?.routes?.length
    ) {

        const error =
            new Error(
                "No road route found"
            );

        error.statusCode = 404;

        throw error;
    }


    const roadRoute =
        response.data.routes[0];


    return {

        routeId:
            route._id,

        geometry:
            roadRoute.geometry,

        distance:
            Math.round(
                roadRoute.distance /
                1000
            ),

        estimatedTime:
            Math.round(
                roadRoute.duration /
                60
            ),

        source:
            "OSRM"

    };

};


export {
    getRoadGeometry
};