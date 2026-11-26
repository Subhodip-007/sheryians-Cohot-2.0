
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
        .bail()
        .isLength({ max: 50 })
        .withMessage("Category cannot exceed 50 characters"),

    body("amountPaise")
        .notEmpty()
        .withMessage("Expense amount is required")
        .bail()
        .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
        .withMessage("Amount must be a positive integer in paise")
        .bail()
        .custom(value => typeof value === "number")
        .withMessage("Amount must be provided as a JSON number"),

    body("date")
        .optional()
        .isISO8601({ strict: true })
        .withMessage("Please provide a valid date")
        .bail()
        .custom(value => {
            const date = new Date(value);
            return !Number.isNaN(date.getTime());
        })
        .withMessage("Invalid expense date"),

    validate
];
