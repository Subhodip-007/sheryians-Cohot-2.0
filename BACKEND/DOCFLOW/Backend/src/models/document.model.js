
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

    originalName: {
        type: String,
        required: true
    },

    fileUrl: {
        type: String,
        required: true
    },

    fileId: {
        type: String,
        required: true
    },

    extractedData: {
        patientName: {
            type: String,
            default: null
        },
        hospitalName: {
            type: String,
            default: null
        },
        reportDate: {
            type: String,
            default: null
        },
        reportType: {
            type: String,
            default: null
        }
    },

    status: {
        type: String,
        enum: ["PROCESSING", "COMPLETED", "FAILED"],
        default: "PROCESSING"
    }

}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);

export default Document;
