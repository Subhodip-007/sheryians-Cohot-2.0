import {
    generateRecommendation
} from "../services/recommendation.service.js";

import {
    approveRecommendation,
    rejectRecommendation
} from "../services/recommendationApproval.service.js";

import Recommendation from "../models/recommendation.model.js";


// --------------------------------------------------
// Generate Recommendation
// --------------------------------------------------

const generate = async (
    req,
    res,
    next
) => {

    try {

        const {
            shipmentId
        } = req.body;


        if (!shipmentId) {

            const error =
                new Error(
                    "shipmentId is required"
                );

            error.statusCode = 400;

            throw error;
        }


        const recommendation =
            await generateRecommendation(
                shipmentId
            );


        res.status(201).json({

            success: true,

            message:
                "Recommendation generated successfully",

            recommendation

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Get All Recommendations
// --------------------------------------------------

const getAll = async (
    req,
    res,
    next
) => {

    try {

        const {
            status
        } = req.query;


        const filter = {};


        if (status) {
            filter.status = status;
        }


        const recommendations =
            await Recommendation.find(
                filter
            )

            .populate(
                "shipment",
                "trackingId status"
            )

            .populate(
                "currentRoute",
                "name distance estimatedTime mode"
            )

            .populate(
                "recommendedRoute",
                "name distance estimatedTime mode"
            )

            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            count:
                recommendations.length,

            recommendations

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Get One Recommendation
// --------------------------------------------------

const getOne = async (
    req,
    res,
    next
) => {

    try {

        const recommendation =
            await Recommendation.findById(
                req.params.id
            )

            .populate(
                "shipment",
                "trackingId status currentLocation"
            )

            .populate(
                "currentRoute",
                "name distance estimatedTime mode status"
            )

            .populate(
                "recommendedRoute",
                "name distance estimatedTime mode status"
            );


        if (!recommendation) {

            const error =
                new Error(
                    "Recommendation not found"
                );

            error.statusCode = 404;

            throw error;
        }


        res.status(200).json({

            success: true,

            recommendation

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Approve Recommendation
// --------------------------------------------------

const approve = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await approveRecommendation(
                req.params.id
            );


        res.status(200).json({

            success: true,

            message:
                "Reroute approved successfully",

            recommendation:
                result.recommendation,

            shipment:
                result.shipment

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Reject Recommendation
// --------------------------------------------------

const reject = async (
    req,
    res,
    next
) => {

    try {

        const recommendation =
            await rejectRecommendation(
                req.params.id
            );


        res.status(200).json({

            success: true,

            message:
                "Recommendation rejected",

            recommendation

        });

    } catch (error) {

        next(error);

    }
};


export {
    generate,
    getAll,
    getOne,
    approve,
    reject
};