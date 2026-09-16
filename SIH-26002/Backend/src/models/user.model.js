import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must contain at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, "Password is required"]
        },

        role: {
            type: String,

            enum: [
                "ADMIN",
                "OPERATOR",
                "DRIVER",
                "FIELD_AGENT"
            ],

            default: "OPERATOR"
        },

        location: {
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

        isActive: {
            type: Boolean,
            default: true
        }
    },

    {
        timestamps: true
    }
);


// -------------------------
// Geospatial Index
// -------------------------

userSchema.index({
    location: "2dsphere"
});


// -------------------------
// Only ONE ADMIN allowed
// -------------------------

userSchema.index(
    { role: 1 },
    {
        unique: true,
        partialFilterExpression: {
            role: "ADMIN"
        }
    }
);


const User = mongoose.model(
    "User",
    userSchema
);

export default User;