import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
    {
        trackingId: {
            type: String,
            required: [true, "Tracking ID is required"],
            unique: true,
            trim: true,
            uppercase: true
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

        cargoType: {
            type: String,
            required: [true, "Cargo type is required"],
            trim: true
        },

        weight: {
            type: Number,
            required: [true, "Shipment weight is required"],
            min: [0, "Weight cannot be negative"]
        },

        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            default: null
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route",
            default: null
        },
        currentSegment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RouteSegment",
    default: null
},

        status: {
            type: String,

            enum: [
                "PENDING",
                "ASSIGNED",
                "IN_TRANSIT",
                "DELAYED",
                "AT_RISK",
                "DELIVERED",
                "CANCELLED"
            ],

            default: "PENDING"
        },

        eta: {
            type: Date,
            default: null
        },

        currentLocation: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },

            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },

        deliveredAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);


// ------------------------------------
// Geospatial Index
// ------------------------------------

shipmentSchema.index({
    currentLocation: "2dsphere"
});


// ------------------------------------
// Shipment Origin Index
// ------------------------------------

shipmentSchema.index({
    "origin.location": "2dsphere"
});


// ------------------------------------
// Shipment Destination Index
// ------------------------------------

shipmentSchema.index({
    "destination.location": "2dsphere"
});


const Shipment = mongoose.model(
    "Shipment",
    shipmentSchema
);

export default Shipment;