import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        registrationNumber: {
            type: String,
            required: [true, "Registration number is required"],
            unique: true,
            trim: true,
            uppercase: true
        },

        type: {
            type: String,
            required: [true, "Vehicle type is required"],
            enum: [
                "TRUCK",
                "VAN",
                "PICKUP",
                "CONTAINER",
                "BUS",
                "OTHER"
            ]
        },

        capacity: {
            type: Number,
            required: [true, "Vehicle capacity is required"],
            min: [1, "Vehicle capacity must be greater than 0"]
        },

        status: {
            type: String,
            enum: [
                "AVAILABLE",
                "ASSIGNED",
                "IN_TRANSIT",
                "MAINTENANCE",
                "INACTIVE"
            ],
            default: "AVAILABLE"
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

        assignedDriver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        currentShipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shipment",
            default: null
        }
    },
    {
        timestamps: true
    }
);


// Geospatial index for vehicle location
vehicleSchema.index({
    currentLocation: "2dsphere"
});


const Vehicle = mongoose.model(
    "Vehicle",
    vehicleSchema
);

export default Vehicle;