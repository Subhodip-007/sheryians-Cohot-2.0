import mongoose from "mongoose";


const recommendationSchema =
    new mongoose.Schema(
        {
            shipment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shipment",
                required: true
            },

            currentRoute: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Route",
                required: true
            },

            recommendedRoute: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Route",
                required: true
            },

            alternatives: [
                {
                    route: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Route"
                    },

                    score: Number,

                    riskScore: Number,

                    accessibilityScore: Number,

                    eta: Number,

                    distance: Number
                }
            ],

            riskScore: {
                type: Number,
                min: 0,
                max: 100
            },

            accessibilityScore: {
                type: Number,
                min: 0,
                max: 100
            },

            confidence: {
                type: Number,
                min: 0,
                max: 100
            },

            reasons: [
                {
                    type: String
                }
            ],

            expectedDelay: {
                type: Number,
                default: 0
            },

            riskReduction: {
                type: Number,
                default: 0
            },

            status: {
                type: String,

                enum: [
                    "PENDING",
                    "APPROVED",
                    "REJECTED",
                    "EXPIRED"
                ],

                default: "PENDING"
            }
        },

        {
            timestamps: true
        }
    );


const Recommendation =
    mongoose.model(
        "Recommendation",
        recommendationSchema
    );


export default Recommendation;