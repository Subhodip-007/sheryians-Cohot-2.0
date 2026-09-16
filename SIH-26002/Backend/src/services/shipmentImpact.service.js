import Shipment from "../models/shipment.model.js";

import RouteSegment from "../models/routeSegment.model.js";

import Incident from "../models/incident.model.js";

import {
    getIO
} from "../socket.js";


// --------------------------------------------------
// Find shipments affected by a route segment
// --------------------------------------------------

const findAffectedShipments = async (
    segmentId
) => {

    const segment =
        await RouteSegment.findById(
            segmentId
        );


    if (!segment) {

        const error =
            new Error(
                "Route segment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    const routeId =
        segment.route;


    if (!routeId) {
        return [];
    }


    // Get all active shipments on this route

    const shipments =
        await Shipment.find({

            route: routeId,

            status: {
                $in: [
                    "ASSIGNED",
                    "IN_TRANSIT",
                    "DELAYED",
                    "AT_RISK"
                ]
            }

        })

        .populate(
            "currentSegment",
            "name segmentIndex status"
        )

        .populate(
            "vehicle",
            "registrationNumber type capacity status"
        )

        .populate(
            "driver",
            "name email role isActive"
        )

        .populate(
            "route",
            "name distance estimatedTime mode status"
        );


    return shipments;
};


// --------------------------------------------------
// Calculate estimated impact
// --------------------------------------------------

const calculateShipmentImpact = (
    shipment,
    incidentSeverity
) => {

    const delayMap = {

        LOW: 15,

        MEDIUM: 30,

        HIGH: 90,

        CRITICAL: 180

    };


    const additionalDelay =
        delayMap[incidentSeverity] || 0;


    let newStatus =
        shipment.status;


    if (
        incidentSeverity === "HIGH" ||
        incidentSeverity === "CRITICAL"
    ) {

        newStatus =
            "AT_RISK";
    }


    return {

        shipmentId:
            shipment._id,

        trackingId:
            shipment.trackingId,

        currentStatus:
            shipment.status,

        recommendedStatus:
            newStatus,

        estimatedAdditionalDelay:
            additionalDelay,

        incidentSeverity

    };
};


// --------------------------------------------------
// Analyze impact of incident
// --------------------------------------------------

const analyzeIncidentImpact = async (
    incidentId
) => {

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


    // Incident does not affect any route segment

    if (!incident.affectedSegment) {

        return {

            incidentId:
                incident._id,

            incidentType:
                incident.type,

            severity:
                incident.severity,

            affectedSegment:
                null,

            affectedShipments: [],

            count: 0

        };
    }


    // Get the affected segment

    const affectedSegment =
        await RouteSegment.findById(
            incident.affectedSegment
        );


    if (!affectedSegment) {

        const error =
            new Error(
                "Affected route segment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    // First get all active shipments
    // on the same route

    const shipments =
        await findAffectedShipments(
            affectedSegment._id
        );


    // Filter shipments that have not
    // passed the affected segment

    const affectedShipments =
        shipments.filter(
            (shipment) => {

                // If shipment has no current segment,
                // consider it potentially affected

                if (
                    !shipment.currentSegment
                ) {

                    return true;
                }


                return (

                    shipment.currentSegment.segmentIndex <=
                    affectedSegment.segmentIndex

                );
            }
        );


    // Calculate impact for every
    // affected shipment

    const impacts =
        affectedShipments.map(
            (shipment) =>

                calculateShipmentImpact(
                    shipment,
                    incident.severity
                )
        );


    return {

        incidentId:
            incident._id,

        incidentType:
            incident.type,

        severity:
            incident.severity,

        affectedSegment:
            affectedSegment._id,

        affectedShipments:
            impacts,

        count:
            impacts.length

    };
};


// --------------------------------------------------
// Apply impact to actual shipments
// --------------------------------------------------

const applyIncidentImpact = async (
    incidentId
) => {

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


    // No affected segment

    if (!incident.affectedSegment) {

        return {

            affectedCount: 0

        };
    }


    // Get affected segment

    const affectedSegment =
        await RouteSegment.findById(
            incident.affectedSegment
        );


    if (!affectedSegment) {

        const error =
            new Error(
                "Affected route segment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    // Get shipments on the same route

    const shipments =
        await findAffectedShipments(
            affectedSegment._id
        );


    // Find shipments actually affected

    const affectedShipments =
        shipments.filter(
            (shipment) => {

                if (
                    !shipment.currentSegment
                ) {

                    return true;
                }


                return (

                    shipment.currentSegment.segmentIndex <=
                    affectedSegment.segmentIndex

                );
            }
        );


    let affectedCount = 0;


    // Apply status changes

    for (
        const shipment
        of affectedShipments
    ) {

        if (

            incident.severity ===
                "HIGH" ||

            incident.severity ===
                "CRITICAL"

        ) {

            shipment.status =
                "AT_RISK";


            await shipment.save();


            // -----------------------------------------
            // Notify shipment subscribers
            // -----------------------------------------

            getIO()
                .to(
                    `shipment:${shipment._id}`
                )
                .emit(
                    "shipment-at-risk",
                    {

                        shipmentId:
                            shipment._id,

                        trackingId:
                            shipment.trackingId,

                        incidentId:
                            incident._id,

                        severity:
                            incident.severity

                    }
                );


            affectedCount++;
        }
    }


    return {

        affectedCount

    };
};


// --------------------------------------------------
// Exports
// --------------------------------------------------

export {

    findAffectedShipments,

    calculateShipmentImpact,

    analyzeIncidentImpact,

    applyIncidentImpact

};