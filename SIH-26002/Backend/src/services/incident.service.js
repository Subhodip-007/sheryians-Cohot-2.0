import Incident from "../models/incident.model.js";
import RouteSegment from "../models/routeSegment.model.js";
import {
    applyIncidentImpact
} from "./shipmentImpact.service.js";
import {
    calculateAccessibilityScore,
    calculateRiskScore
} from "../utils/score.js";


// --------------------------------------------------
// Incident Severity → Risk
// --------------------------------------------------

const severityRiskMap = {
    LOW: 20,
    MEDIUM: 45,
    HIGH: 70,
    CRITICAL: 95
};


// --------------------------------------------------
// Find nearest route segment
// --------------------------------------------------

const findNearestRouteSegment = async (
    coordinates
) => {

    const segment =
        await RouteSegment.findOne({
            startPoint: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates
                    },

                    $maxDistance: 5000
                }
            }
        });


    return segment;
};


// --------------------------------------------------
// Calculate incident risk for a segment
// --------------------------------------------------

const calculateIncidentRiskForSegment =
    async (segmentId) => {

        const incidents =
            await Incident.find({
                affectedSegment: segmentId,

                status: {
                    $in: [
                        "REPORTED",
                        "VERIFIED"
                    ]
                }
            });


        if (incidents.length === 0) {
            return 0;
        }


        let highestRisk = 0;


        for (
            const incident
            of incidents
        ) {

            const risk =
                severityRiskMap[
                    incident.severity
                ] || 0;


            if (risk > highestRisk) {
                highestRisk = risk;
            }
        }


        return highestRisk;
    };


// --------------------------------------------------
// Recalculate segment scores
// --------------------------------------------------

const recalculateSegment =
    async (segmentId) => {

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


        // Get current incident risk
        const incidentRisk =
            await calculateIncidentRiskForSegment(
                segmentId
            );


        // Update incident risk
        segment.incidentRisk =
            incidentRisk;


        // Recalculate accessibility
        const accessibilityScore =
            calculateAccessibilityScore({

                roadCondition:
                    segment.roadCondition,

                terrainRisk:
                    segment.terrainRisk,

                slopeRisk:
                    segment.slopeRisk,

                connectivity:
                    segment.connectivity,

                weatherRisk:
                    segment.weatherRisk,

                incidentRisk:
                    incidentRisk,

                vehicleSuitability:
                    segment.vehicleSuitability

            });


        // Recalculate overall risk
        const riskScore =
            calculateRiskScore({

                roadCondition:
                    segment.roadCondition,

                terrainRisk:
                    segment.terrainRisk,

                slopeRisk:
                    segment.slopeRisk,

                connectivity:
                    segment.connectivity,

                weatherRisk:
                    segment.weatherRisk,

                incidentRisk:
                    incidentRisk,

                vehicleSuitability:
                    segment.vehicleSuitability

            });


        segment.accessibilityScore =
            accessibilityScore;

        segment.riskScore =
            riskScore;


        await segment.save();


        return segment;
    };


// --------------------------------------------------
// Create Incident
// --------------------------------------------------

const createIncident = async ({
    type,
    severity,
    description,
    location,
    photo,
    reportedBy
}) => {

    const nearbySegment =
        await findNearestRouteSegment(
            location.coordinates
        );


    const incident =
        await Incident.create({

            type,

            severity,

            description,

            location,

            photo:
                photo || null,

            affectedSegment:
                nearbySegment
                    ? nearbySegment._id
                    : null,

            reportedBy

        });


    // Immediately recalculate segment
    
    if (nearbySegment) {

        await recalculateSegment(
            nearbySegment._id
        );
        await applyIncidentImpact(
    incident._id
);

    }


    return Incident.findById(
        incident._id
    )
    .populate(
        "reportedBy",
        "name email role"
    )
    .populate(
        "affectedSegment",
        "name route status riskScore accessibilityScore incidentRisk"
    );
};


// --------------------------------------------------
// Get All Incidents
// --------------------------------------------------

const getAllIncidents = async ({
    status,
    severity,
    type
} = {}) => {

    const filter = {};


    if (status) {
        filter.status = status;
    }


    if (severity) {
        filter.severity = severity;
    }


    if (type) {
        filter.type = type;
    }


    const incidents =
        await Incident.find(filter)

            .populate(
                "reportedBy",
                "name email role"
            )

            .populate(
                "affectedSegment",
                "name route status riskScore accessibilityScore incidentRisk"
            )

            .populate(
                "verifiedBy",
                "name email role"
            )

            .sort({
                createdAt: -1
            });


    return incidents;
};


// --------------------------------------------------
// Get One Incident
// --------------------------------------------------

const getIncidentById = async (
    incidentId
) => {

    const incident =
        await Incident.findById(
            incidentId
        )

        .populate(
            "reportedBy",
            "name email role"
        )

        .populate(
            "affectedSegment",
            "name route status riskScore accessibilityScore incidentRisk"
        )

        .populate(
            "verifiedBy",
            "name email role"
        );


    if (!incident) {

        const error = new Error(
            "Incident not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return incident;
};


// --------------------------------------------------
// Update Incident
// --------------------------------------------------

const updateIncident = async (
    incidentId,
    data,
    userId
) => {

    const incident =
        await Incident.findById(
            incidentId
        );


    if (!incident) {

        const error = new Error(
            "Incident not found"
        );

        error.statusCode = 404;

        throw error;
    }


    const previousSegmentId =
        incident.affectedSegment
            ? incident.affectedSegment.toString()
            : null;


    const allowedUpdates = {};


    if (data.type !== undefined) {
        allowedUpdates.type =
            data.type;
    }


    if (data.severity !== undefined) {
        allowedUpdates.severity =
            data.severity;
    }


    if (
        data.description !==
        undefined
    ) {
        allowedUpdates.description =
            data.description;
    }


    if (
        data.photo !==
        undefined
    ) {
        allowedUpdates.photo =
            data.photo;
    }


    if (
        data.status !==
        undefined
    ) {

        allowedUpdates.status =
            data.status;


        if (
            data.status ===
            "VERIFIED"
        ) {

            allowedUpdates.verifiedBy =
                userId;
        }


        if (
            data.status ===
            "RESOLVED"
        ) {

            allowedUpdates.resolvedAt =
                new Date();
        }


        if (
            data.status ===
            "REJECTED"
        ) {

            allowedUpdates.resolvedAt =
                null;
        }
    }


    const updatedIncident =
        await Incident.findByIdAndUpdate(
            incidentId,
            allowedUpdates,
            {
                new: true,
                runValidators: true
            }
        );


    // ----------------------------------------------
    // Recalculate affected segment after update
    // ----------------------------------------------

    if (previousSegmentId) {

        await recalculateSegment(
            previousSegmentId
        );

    }


    return Incident.findById(
        updatedIncident._id
    )
    .populate(
        "reportedBy",
        "name email role"
    )
    .populate(
        "affectedSegment",
        "name route status riskScore accessibilityScore incidentRisk"
    )
    .populate(
        "verifiedBy",
        "name email role"
    );
};


// --------------------------------------------------
// Delete Incident
// --------------------------------------------------

const deleteIncident = async (
    incidentId
) => {

    const incident =
        await Incident.findById(
            incidentId
        );


    if (!incident) {

        const error = new Error(
            "Incident not found"
        );

        error.statusCode = 404;

        throw error;
    }


    const affectedSegmentId =
        incident.affectedSegment;


    await Incident.findByIdAndDelete(
        incidentId
    );


    // Recalculate after removal
    if (affectedSegmentId) {

        await recalculateSegment(
            affectedSegmentId
        );

    }
};


export {
    createIncident,
    getAllIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
    calculateIncidentRiskForSegment,
    recalculateSegment
};