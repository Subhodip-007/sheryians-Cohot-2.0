import Shipment from "../models/shipment.model.js";

import Vehicle from "../models/vehicle.model.js";

import {
    updateVehicleLocation
} from "./tracking.service.js";


/* =========================================================
   SIMULATOR STATE

   Prevents multiple simulators from running for
   the same shipment at the same time.
========================================================= */

const activeSimulations =
    new Map();


/* =========================================================
   DISTANCE
========================================================= */

const distanceBetweenPointsKm = (
    pointA,
    pointB
) => {

    const [
        lon1,
        lat1
    ] = pointA;

    const [
        lon2,
        lat2
    ] = pointB;


    const toRadians =
        value =>
            value *
            Math.PI /
            180;


    const R =
        6371;


    const dLat =
        toRadians(
            lat2 - lat1
        );

    const dLon =
        toRadians(
            lon2 - lon1
        );


    const a =
        Math.sin(dLat / 2) ** 2 +

        Math.cos(
            toRadians(lat1)
        ) *

        Math.cos(
            toRadians(lat2)
        ) *

        Math.sin(dLon / 2) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;
};


/* =========================================================
   LINEAR INTERPOLATION
========================================================= */

const interpolatePoint = (
    start,
    end,
    progress
) => {

    const longitude =
        start[0] +
        (
            end[0] -
            start[0]
        ) *
        progress;


    const latitude =
        start[1] +
        (
            end[1] -
            start[1]
        ) *
        progress;


    return [
        longitude,
        latitude
    ];

};


/* =========================================================
   SLEEP
========================================================= */

const sleep = (
    milliseconds
) =>
    new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );


/* =========================================================
   START SIMULATION
========================================================= */

const startShipmentSimulation =
    async ({
        shipmentId,
        stepMs = 3000,
        stepsPerSegment = 10
    }) => {

        /* -----------------------------------------------
           Prevent duplicate simulation
        ------------------------------------------------ */

        if (
            activeSimulations.has(
                shipmentId
            )
        ) {

            return {
                started: false,
                message:
                    "Simulation already running"
            };

        }


        /* -----------------------------------------------
           Load shipment
        ------------------------------------------------ */

        const shipment =
            await Shipment
                .findById(
                    shipmentId
                )
                .populate(
                    "vehicle"
                )
                .populate(
                    "route"
                );


        if (!shipment) {

            const error =
                new Error(
                    "Shipment not found"
                );

            error.statusCode =
                404;

            throw error;

        }


        if (
            !shipment.vehicle
        ) {

            const error =
                new Error(
                    "Shipment does not have an assigned vehicle"
                );

            error.statusCode =
                400;

            throw error;

        }


        if (
            !shipment.route
        ) {

            const error =
                new Error(
                    "Shipment does not have an assigned route"
                );

            error.statusCode =
                400;

            throw error;

        }


        const vehicleId =
            shipment
                .vehicle
                ._id;


        const routeGeometry =
            shipment
                .route
                ?.geometry
                ?.coordinates;


        if (
            !Array.isArray(
                routeGeometry
            ) ||
            routeGeometry.length < 2
        ) {

            const error =
                new Error(
                    "Shipment route does not contain valid geometry"
                );

            error.statusCode =
                400;

            throw error;

        }


        /* -----------------------------------------------
           Mark simulation active
        ------------------------------------------------ */

        activeSimulations.set(
            shipmentId,
            true
        );


        /* -----------------------------------------------
           Run asynchronously
        ------------------------------------------------ */

        const run =
            async () => {

                try {

                    /*
                     * Start from the first coordinate.
                     */

                    const firstPoint =
                        routeGeometry[0];


                    await updateVehicleLocation({

                        vehicleId,

                        coordinates:
                            firstPoint

                    });


                    /*
                     * Walk through every route edge.
                     */

                    for (
                        let i = 0;

                        i <
                        routeGeometry.length - 1;

                        i++
                    ) {

                        const start =
                            routeGeometry[i];

                        const end =
                            routeGeometry[
                                i + 1
                            ];


                        /*
                         * Approximate number of
                         * intermediate GPS updates.
                         */

                        const segmentDistance =
                            distanceBetweenPointsKm(
                                start,
                                end
                            );


                        /*
                         * Larger physical distance
                         * means more simulated steps.
                         */

                        const calculatedSteps =
                            Math.max(
                                stepsPerSegment,
                                Math.ceil(
                                    segmentDistance *
                                    2
                                )
                            );


                        for (
                            let step = 1;

                            step <=
                            calculatedSteps;

                            step++
                        ) {

                            /*
                             * Stop if another request
                             * terminated this simulation.
                             */

                            if (
                                !activeSimulations.has(
                                    shipmentId
                                )
                            ) {

                                return;

                            }


                            const progress =
                                step /
                                calculatedSteps;


                            const coordinates =
                                interpolatePoint(
                                    start,
                                    end,
                                    progress
                                );


                            /*
                             * This uses the SAME
                             * tracking service used by
                             * real API updates.
                             */

                            await updateVehicleLocation({

                                vehicleId,

                                coordinates

                            });


                            await sleep(
                                stepMs
                            );

                        }

                    }


                    /*
                     * Ensure we end exactly at
                     * the final route coordinate.
                     */

                    const destination =
                        routeGeometry[
                            routeGeometry.length - 1
                        ];


                    await updateVehicleLocation({

                        vehicleId,

                        coordinates:
                            destination

                    });


                } catch (error) {

                    console.error(
                        `Shipment simulation failed for ${shipmentId}:`,
                        error
                    );

                } finally {

                    activeSimulations.delete(
                        shipmentId
                    );

                }

            };


        /*
         * Don't block the API request.
         */

        run();


        return {

            started: true,

            shipmentId,

            vehicleId,

            routeId:
                shipment
                    .route
                    ._id,

            message:
                "Shipment simulation started"

        };

    };


/* =========================================================
   STOP SIMULATION
========================================================= */

const stopShipmentSimulation =
    (
        shipmentId
    ) => {

        const running =
            activeSimulations.has(
                shipmentId
            );


        if (
            running
        ) {

            activeSimulations.delete(
                shipmentId
            );

        }


        return {

            stopped:
                running,

            shipmentId

        };

    };


/* =========================================================
   STATUS
========================================================= */

const getSimulationStatus =
    (
        shipmentId
    ) => {

        return {

            shipmentId,

            running:
                activeSimulations.has(
                    shipmentId
                )

        };

    };


/* =========================================================
   EXPORT
========================================================= */

export {

    startShipmentSimulation,

    stopShipmentSimulation,

    getSimulationStatus

};