
import { body, validationResult } from "express-validator";

// Validation error handler
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }

    next();
};


export const ExpenseValidator = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Expense title is required")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Expense category is required")
        .bail(),

    body("amountPaise")
        .notEmpty()
        .withMessage("Expense amount is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Amount must be a positive integer in paise"),

    body("date")
        .optional()
        .isISO8601()
        .withMessage("Please provide a valid date"),

    validate
];
