import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Route name is required"],
            trim: true
        },

        origin: {
            name: {
                type: String,
                required: true,
                trim: true
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
            }
        },

        destination: {
            name: {
                type: String,
                required: true,
                trim: true
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
                default: []
            }
        },

        distance: {
            type: Number,
            required: true,
            min: 0
        },

        estimatedTime: {
            type: Number,
            required: true,
            min: 0
        },

        mode: {
            type: String,
            enum: [
                "ROAD",
                "RAIL",
                "WATER",
                "AIR",
                "ROAD_RAIL",
                "ROAD_WATER"
            ],
            default: "ROAD"
        },

        segments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RouteSegment"
            }
        ],

        status: {
            type: String,
            enum: [
                "ACTIVE",
                "INACTIVE",
                "BLOCKED"
            ],
            default: "ACTIVE"
        }
    },

    {
        timestamps: true
    }
);


// Geospatial index for the route origin
routeSchema.index({
    "origin.location": "2dsphere"
});


// Geospatial index for destination
routeSchema.index({
    "destination.location": "2dsphere"
});


const Route = mongoose.model(
    "Route",
    routeSchema
);

export default Route;