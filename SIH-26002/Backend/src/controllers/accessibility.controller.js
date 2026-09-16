import {
    recalculateSegmentScores,
    calculateRouteAccessibility
} from "../services/accessibility.service.js";


// --------------------------------------------------
// Segment
// --------------------------------------------------

const recalculate = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await recalculateSegmentScores(
                req.params.id
            );


        res.status(200).json({

            success: true,

            message:
                "Accessibility and risk scores recalculated",

            segmentId:
                result.segment._id,

            accessibilityScore:
                result.accessibilityScore,

            riskScore:
                result.riskScore,

            riskLevel:
                result.riskLevel

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Route
// --------------------------------------------------

const getRouteAccessibility =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await calculateRouteAccessibility(
                    req.params.id
                );


            res.status(200).json({

                success: true,

                accessibility:
                    result

            });

        } catch (error) {

            next(error);

        }
    };


export {
    recalculate,
    getRouteAccessibility
};