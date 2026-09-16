import Shipment from "../models/shipment.model.js";

import RouteSegment
    from "../models/routeSegment.model.js";


/* =========================================================
   DISTANCE BETWEEN TWO COORDINATES
   Haversine distance in KM
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
        Math.sin(
            dLat / 2
        ) ** 2 +

        Math.cos(
            toRadians(lat1)
        ) *
        Math.cos(
            toRadians(lat2)
        ) *
        Math.sin(
            dLon / 2
        ) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;
};


/* =========================================================
   FIND NEAREST SEGMENT
========================================================= */

const findNearestSegment = async (
    routeId,
    coordinates
) => {

    const segments =
        await RouteSegment
            .find({
                route: routeId
            })
            .sort({
                segmentIndex: 1
            });


    if (
        segments.length === 0
    ) {

        return null;

    }


    let nearestSegment =
        null;

    let nearestDistance =
        Infinity;


    for (
        const segment
        of segments
    ) {

        const geometry =
            segment
                ?.geometry
                ?.coordinates;


        if (
            !Array.isArray(
                geometry
            ) ||
            geometry.length === 0
        ) {

            continue;

        }


        /*
         * Prototype approximation:
         *
         * Compare the vehicle position to
         * every coordinate in the segment geometry.
         */

        for (
            const point
            of geometry
        ) {

            if (
                !Array.isArray(point) ||
                point.length < 2
            ) {

                continue;

            }


            const distance =
                distanceBetweenPointsKm(
                    coordinates,
                    point
                );


            if (
                distance <
                nearestDistance
            ) {

                nearestDistance =
                    distance;

                nearestSegment =
                    segment;

            }

        }

    }


    return nearestSegment;

};


/* =========================================================
   UPDATE SHIPMENT LOCATION
========================================================= */

const updateShipmentLocation =
    async (
        shipmentId,
        coordinates
    ) => {

        const shipment =
            await Shipment.findById(
                shipmentId
            );


        if (!shipment) {

            const error =
                new Error(
                    "Shipment not found"
                );

            error.statusCode = 404;

            throw error;

        }


        /* -----------------------------------------------
           Update location
        ------------------------------------------------ */

        shipment.currentLocation = {

            type: "Point",

            coordinates

        };


        /* -----------------------------------------------
           Find current segment
        ------------------------------------------------ */

        if (
            shipment.route
        ) {

            const nearestSegment =
                await findNearestSegment(
                    shipment.route,
                    coordinates
                );


            if (
                nearestSegment
            ) {

                shipment.currentSegment =
                    nearestSegment._id;

            }

        }


        /* -----------------------------------------------
           Save
        ------------------------------------------------ */

        await shipment.save();


        /* -----------------------------------------------
           Return populated shipment
        ------------------------------------------------ */

        return Shipment
            .findById(
                shipment._id
            )

            .populate(
                "currentSegment",
                `
                    name
                    segmentIndex
                    status
                    riskScore
                    accessibilityScore
                `
            )

            .populate(
                "route",
                `
                    name
                    distance
                    estimatedTime
                    mode
                    status
                `
            );

    };


/* =========================================================
   EXPORT
========================================================= */

export {

    findNearestSegment,

    updateShipmentLocation

};