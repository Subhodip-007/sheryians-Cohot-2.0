import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // MongoDB will automatically delete this document exactly 5 minutes (300 seconds) after creation
            expires: 300, 
        },
    },
    { 
        timestamps: false // Handled manually by createdAt for the TTL index
    }
);

// Create a compound index if you want to quickly look up an email and OTP pairing
otpSchema.index({ email: 1, otp: 1 });

const OtpModel = mongoose.model("Otp-collection", otpSchema);

export default OtpModel;