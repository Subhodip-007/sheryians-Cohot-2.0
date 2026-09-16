import mongoose from "mongoose";

const routeSegmentSchema = new mongoose.Schema(
    {
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route",
            required: true
        },segmentIndex: {
    type: Number,
    required: true,
    min: 0
},
        name: {
            type: String,
            required: [true, "Segment name is required"],
            trim: true
        },

        startPoint: {
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

        endPoint: {
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

        geometry: {
            type: {
                type: String,
                enum: ["LineString"],
                default: "LineString"
            },

            coordinates: {
                type: [[Number]],
                required: true
            }
        },

        distance: {
            type: Number,
            required: true,
            min: [0, "Segment distance cannot be negative"]
        },

        roadCondition: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        terrainRisk: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        slopeRisk: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        connectivity: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        weatherRisk: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        incidentRisk: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        vehicleSuitability: {
            type: Number,
            default: 100,
            min: 0,
            max: 100
        },

        accessibilityScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        riskScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        status: {
            type: String,

            enum: [
                "OPEN",
                "RESTRICTED",
                "BLOCKED"
            ],

            default: "OPEN"
        }
    },
    {
        timestamps: true
    }
);


// Geospatial indexes
routeSegmentSchema.index({
    startPoint: "2dsphere"
});

routeSegmentSchema.index({
    endPoint: "2dsphere"
});

routeSegmentSchema.index({
    geometry: "2dsphere"
});


const RouteSegment = mongoose.model(
    "RouteSegment",
    routeSegmentSchema
);

export default RouteSegment;