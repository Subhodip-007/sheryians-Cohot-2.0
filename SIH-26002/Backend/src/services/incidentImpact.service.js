import Incident from "../models/incident.model.js";

import Shipment from "../models/shipment.model.js";

import RouteSegment
    from "../models/routeSegment.model.js";

import {
    recalculateSegment
} from "./incident.service.js";

import {
    generateRecommendation
} from "./recommendation.service.js";


/* =========================================================
   CONFIG
========================================================= */

/*
 * Maximum distance from an incident to a route segment
 * for automatic association.
 *
 * MongoDB 2dsphere distance is in meters.
 *
 * 10 km is intentionally generous for the prototype.
 */
const INCIDENT_SEGMENT_RADIUS_METERS =
    10000;


/* =========================================================
   FIND AFFECTED SEGMENT
========================================================= */

const findAffectedSegment = async (
    incident
) => {

    const coordinates =
        incident
            ?.location
            ?.coordinates;


    /* -----------------------------------------------------
       Validate incident coordinates
    ----------------------------------------------------- */

    if (
        !Array.isArray(coordinates) ||
        coordinates.length !== 2
    ) {

        return null;

    }


    const [
        longitude,
        latitude
    ] = coordinates;


    if (
        !Number.isFinite(longitude) ||
        !Number.isFinite(latitude)
    ) {

        return null;

    }


    /* -----------------------------------------------------
       Find nearest route segment
    ----------------------------------------------------- */

    const result =
        await RouteSegment.aggregate([

            {
                $geoNear: {

                    near: {
                        type: "Point",
                        coordinates: [
                            longitude,
                            latitude
                        ]
                    },

                    key: "geometry",

                    distanceField:
                        "distanceFromIncident",

                    spherical: true,

                    maxDistance:
                        INCIDENT_SEGMENT_RADIUS_METERS,

                    query: {

                        status: {
                            $ne: "BLOCKED"
                        }

                    }

                }

            },

            {
                $sort: {
                    distanceFromIncident: 1
                }
            },

            {
                $limit: 1
            }

        ]);


    if (
        result.length === 0
    ) {

        return null;

    }


    return result[0];

};


/* =========================================================
   PROCESS INCIDENT IMPACT
========================================================= */

const processIncidentImpact =
    async (
        incidentId
    ) => {

        /* -------------------------------------------------
           Find incident
        ------------------------------------------------- */

        const incident =
            await Incident.findById(
                incidentId
            );


        if (!incident) {

            const error =
                new Error(
                    "Incident not found"
                );

            error.statusCode = 404;

            throw error;

        }


        /* -------------------------------------------------
           Find affected segment if not already assigned
        ------------------------------------------------- */

        if (
            !incident.affectedSegment
        ) {

            const affectedSegment =
                await findAffectedSegment(
                    incident
                );


            if (
                !affectedSegment
            ) {

                return {

                    incidentId:
                        incident._id,

                    affectedSegment:
                        null,

                    affectedShipmentCount:
                        0,

                    affectedShipments:
                        [],

                    recommendations:
                        [],

                    message:
                        "No route segment found within the incident matching radius."

                };

            }


            /*
             * Attach the segment to the incident.
             */

            incident.affectedSegment =
                affectedSegment._id;


            await incident.save();

        }


        /* -------------------------------------------------
           Load the actual Mongoose segment
        ------------------------------------------------- */

        const affectedSegment =
            await RouteSegment.findById(
                incident.affectedSegment
            );


        if (
            !affectedSegment
        ) {

            const error =
                new Error(
                    "Affected route segment not found"
                );

            error.statusCode = 404;

            throw error;

        }


        /* -------------------------------------------------
           Recalculate risk/accessibility
        ------------------------------------------------- */

        await recalculateSegment(
            affectedSegment._id
        );


        /* -------------------------------------------------
           Find shipments on affected route
        ------------------------------------------------- */

        const shipments =
            await Shipment.find({

                route:
                    affectedSegment.route,

                status: {
                    $in: [
                        "ASSIGNED",
                        "IN_TRANSIT",
                        "DELAYED",
                        "AT_RISK"
                    ]
                },

                currentSegment: {
                    $ne: null
                }

            });


        /* -------------------------------------------------
           Determine which shipments have not passed
           the affected segment
        ------------------------------------------------- */

        const affectedShipments = [];


        for (
            const shipment
            of shipments
        ) {

            const shipmentSegment =
                await RouteSegment.findById(
                    shipment.currentSegment
                );


            if (
                !shipmentSegment
            ) {

                continue;

            }


            /*
             * If shipment segment index is equal to
             * or before the affected segment, the
             * shipment can still be impacted.
             */

            if (
                shipmentSegment.segmentIndex <=
                affectedSegment.segmentIndex
            ) {

                affectedShipments.push(
                    shipment
                );

            }

        }


        /* -------------------------------------------------
           Generate recommendations
        ------------------------------------------------- */

        const recommendations = [];


        for (
            const shipment
            of affectedShipments
        ) {

            try {

                const recommendation =
                    await generateRecommendation(
                        shipment._id
                    );


                recommendations.push(
                    recommendation
                );

            } catch (error) {

                console.error(
                    `Recommendation failed for ${shipment._id}:`,
                    error.message
                );

            }

        }


        /* -------------------------------------------------
           Return impact result
        ------------------------------------------------- */

        return {

            incidentId:
                incident._id,

            affectedSegment:
                affectedSegment._id,

            affectedShipmentCount:
                affectedShipments.length,

            affectedShipments:

                affectedShipments.map(
                    shipment => ({

                        shipmentId:
                            shipment._id,

                        trackingId:
                            shipment.trackingId,

                        status:
                            shipment.status,

                        currentSegment:
                            shipment.currentSegment

                    })
                ),

            recommendations

        };

    };


/* =========================================================
   EXPORT
========================================================= */

export {
    processIncidentImpact
};