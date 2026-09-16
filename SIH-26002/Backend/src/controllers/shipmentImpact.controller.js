import {
    analyzeIncidentImpact,
    applyIncidentImpact
} from "../services/shipmentImpact.service.js";


// --------------------------------------------------
// Analyze impact
// --------------------------------------------------

const analyze = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await analyzeIncidentImpact(
                req.params.incidentId
            );


        res.status(200).json({

            success: true,

            impact: result

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Apply impact
// --------------------------------------------------

const apply = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await applyIncidentImpact(
                req.params.incidentId
            );


        res.status(200).json({

            success: true,

            message:
                "Incident impact applied to shipments",

            affectedCount:
                result.affectedCount

        });

    } catch (error) {

        next(error);

    }
};


export {
    analyze,
    apply
};