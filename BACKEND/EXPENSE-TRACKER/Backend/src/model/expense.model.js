
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User-collection",
            required: true,
            index: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        amountPaise: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isSafeInteger,
                message: "Amount must be a positive integer in paise"
            }
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Index for fetching a user's expenses by date
expenseSchema.index({ userId: 1, date: -1 });

export const expenseModel = mongoose.model(
    "expense-collection",
    expenseSchema
);