import {
    createIncident,
    getAllIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident
} from "../services/incident.service.js";

import {
    processIncidentImpact
} from "../services/incidentImpact.service.js";
// --------------------------------------------------
// Create Incident
// --------------------------------------------------
const create = async (
    req,
    res,
    next
) => {

    try {

        const {
            type,
            severity,
            description,
            location,
            photo
        } = req.body;


        /* ---------------------------------------------
           Create incident
        --------------------------------------------- */

        const incident =
            await createIncident({

                type,

                severity,

                description,

                location,

                photo,

                reportedBy:
                    req.user._id

            });


        /* ---------------------------------------------
           Process impact
        --------------------------------------------- */

        const impact =
            await processIncidentImpact(
                incident._id
            );


        /* ---------------------------------------------
           Response
        --------------------------------------------- */

        res.status(201).json({

            success: true,

            message:
                "Incident reported and impact processed",

            incident,

            impact

        });

    } catch (error) {

        next(error);

    }

};

// --------------------------------------------------
// Get All
// --------------------------------------------------

const getAll = async (req, res, next) => {
    try {
        const {
            status,
            severity,
            type
        } = req.query;

        const incidents = await getAllIncidents({
            status,
            severity,
            type
        });

        res.status(200).json({
            success: true,
            count: incidents.length,
            incidents
        });

    } catch (error) {
        next(error);
    }
};


// --------------------------------------------------
// Get One
// --------------------------------------------------

const getOne = async (req, res, next) => {
    try {
        const incident = await getIncidentById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            incident
        });

    } catch (error) {
        next(error);
    }
};


// --------------------------------------------------
// Update
// --------------------------------------------------

const update = async (req, res, next) => {
    try {
        const incident = await updateIncident(
            req.params.id,
            req.body,
            req.user._id
        );

        res.status(200).json({
            success: true,
            message: "Incident updated successfully",
            incident
        });

    } catch (error) {
        next(error);
    }
};


// --------------------------------------------------
// Delete
// --------------------------------------------------

const remove = async (req, res, next) => {
    try {
        await deleteIncident(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Incident deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


export {
    create,
    getAll,
    getOne,
    update,
    remove
};

