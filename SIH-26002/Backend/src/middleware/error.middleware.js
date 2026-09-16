import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
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

const errorMiddleware = (
    err,
    req,
    res,
    next
) => {

    console.error(
        err
    );


    // Duplicate key
    if (
        err.code === 11000
    ) {

        return res.status(409).json({
            success: false,
            message:
                "Duplicate value already exists",
            field:
                Object.keys(
                    err.keyPattern || {}
                )[0] || null
        });
    }


    // Invalid MongoDB ObjectId
    if (
        err.name ===
        "CastError"
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Invalid resource ID"
        });
    }


    // Mongoose validation
    if (
        err.name ===
        "ValidationError"
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Validation failed",
            errors:
                Object.values(
                    err.errors
                ).map(
                    (error) => ({
                        field:
                            error.path,
                        message:
                            error.message
                    })
                )
        });
    }


    const statusCode =
        err.statusCode || 500;


    res.status(statusCode).json({
        success: false,
        message:
            err.message ||
            "Internal server error"
    });
};
export {
    validateRequest,
    errorMiddleware
};