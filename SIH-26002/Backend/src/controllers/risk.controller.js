import {
    getSegmentRisk
} from "../services/risk.service.js";


const getSegmentRiskController = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await getSegmentRisk(
                req.params.id
            );


        res.status(200).json({

            success: true,

            risk: result

        });

    } catch (error) {

        next(error);

    }
};


export {
    getSegmentRiskController
};