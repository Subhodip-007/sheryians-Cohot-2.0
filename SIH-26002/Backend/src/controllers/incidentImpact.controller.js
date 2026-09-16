import {
    processIncidentImpact
} from "../services/incidentImpact.service.js";


const processImpact = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await processIncidentImpact(
                req.params.incidentId
            );


        res.status(200).json({

            success: true,

            message:
                "Incident impact processed successfully",

            result

        });

    } catch (error) {

        next(error);

    }
};


export {
    processImpact
};
