import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User-collection",
        required:true,
    },
     title: {
        type: String,
        required: true
    },
    amountPaise: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }

},{timeStamps : true});

export const expenseModel = mongoose.model("expense-collection", expenseSchema);