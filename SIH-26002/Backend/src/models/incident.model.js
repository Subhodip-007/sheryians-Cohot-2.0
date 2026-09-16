import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Incident type is required"],
            enum: [
                "LANDSLIDE",
                "FLOOD",
                "ROAD_BLOCK",
                "ACCIDENT",
                "VEHICLE_BREAKDOWN",
                "ROAD_DAMAGE",
                "WEATHER",
                "OTHER"
            ]
        },

        severity: {
            type: String,
            required: [true, "Incident severity is required"],
            enum: [
                "LOW",
                "MEDIUM",
                "HIGH",
                "CRITICAL"
            ]
        },

        description: {
            type: String,
            required: [true, "Incident description is required"],
            trim: true,
            maxlength: [
                1000,
                "Description cannot exceed 1000 characters"
            ]
        },

        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },

            coordinates: {
                type: [Number],
                required: true
            }
        },

        photo: {
            type: String,
            default: null
        },

        affectedSegment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RouteSegment",
            default: null
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "REPORTED",
                "VERIFIED",
                "RESOLVED",
                "REJECTED"
            ],
            default: "REPORTED"
        },

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        resolvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);


// ------------------------------------
// Geospatial index
// ------------------------------------

incidentSchema.index({
    location: "2dsphere"
});


const Incident = mongoose.model(
    "Incident",
    incidentSchema
);

export default Incident;