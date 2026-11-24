
import mongoose from "mongoose";
import { expenseModel } from "../model/expense.model.js";

// CREATE EXPENSE
export const createExpenseController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            date,
            amountPaise
        } = req.body;

        const expense = await expenseModel.create({
            userId: req.user._id,
            title,
            description,
            category,
            amountPaise,
            date: date ? new Date(date) : new Date()
        });

        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expense
        });

    } catch (err) {
        next(err);
    }
};


// GET ALL EXPENSES
export const getAllExpenceController = async (req, res, next) => {
    try {
        const expenses = await expenseModel.find({
            userId: req.user._id
        }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            total: expenses.length,
            expenses
        });

    } catch (err) {
        next(err);
    }
};


// GET SINGLE EXPENSE
export const getSingleExpenseController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID"
            });
        }

        const expense = await expenseModel.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            expense
        });

    } catch (err) {
        next(err);
    }
};


// UPDATE EXPENSE
export const updateExpenseController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID"
            });
        }

        const allowedFields = [
            "title",
            "amountPaise",
            "category",
            "description",
            "date"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided"
            });
        }

        if (
            updates.amountPaise !== undefined &&
            (!Number.isSafeInteger(updates.amountPaise) ||
             updates.amountPaise <= 0)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });
        }

        if (
            updates.title !== undefined &&
            (typeof updates.title !== "string" || !updates.title.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid title"
            });
        }

        if (
            updates.category !== undefined &&
            (typeof updates.category !== "string" || !updates.category.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        if (updates.date !== undefined) {
            const parsedDate = new Date(updates.date);

            if (Number.isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date"
                });
            }

            updates.date = parsedDate;
        }

        if (updates.title !== undefined) {
            updates.title = updates.title.trim();
        }

        if (updates.category !== undefined) {
            updates.category = updates.category.trim();
        }

        const expense = await expenseModel.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense
        });

    } catch (err) {
        next(err);
    }
};


// DELETE EXPENSE
export const deleteExpenseController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID"
            });
        }

        const expense = await expenseModel.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (err) {
        next(err);
    }
};
