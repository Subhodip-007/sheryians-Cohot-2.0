import { body, param } from "express-validator";


// --------------------------------------------------
// MongoDB ObjectId validation
// --------------------------------------------------

const objectIdValidation = (fieldName) => {
    return param(fieldName)
        .isMongoId()
        .withMessage(
            `${fieldName} must be a valid MongoDB ID`
        );
};


// --------------------------------------------------
// Vehicle validation
// --------------------------------------------------

const createVehicleValidation = [
    body("registrationNumber")
        .trim()
        .notEmpty()
        .withMessage(
            "Registration number is required"
        ),

    body("type")
        .isIn([
            "TRUCK",
            "VAN",
            "PICKUP",
            "CONTAINER",
            "BUS",
            "OTHER"
        ])
        .withMessage(
            "Invalid vehicle type"
        ),

    body("capacity")
        .isFloat({
            min: 1
        })
        .withMessage(
            "Capacity must be greater than 0"
        )
];


// --------------------------------------------------
// Shipment validation
// --------------------------------------------------

const createShipmentValidation = [
    body("trackingId")
        .trim()
        .notEmpty()
        .withMessage(
            "Tracking ID is required"
        ),

    body("cargoType")
        .trim()
        .notEmpty()
        .withMessage(
            "Cargo type is required"
        ),

    body("weight")
        .isFloat({
            min: 0
        })
        .withMessage(
            "Weight cannot be negative"
        ),

    body("origin")
        .isObject()
        .withMessage(
            "Origin is required"
        ),

    body("destination")
        .isObject()
        .withMessage(
            "Destination is required"
        )
];


// --------------------------------------------------
// Incident validation
// --------------------------------------------------

const createIncidentValidation = [
    body("type")
        .isIn([
            "LANDSLIDE",
            "FLOOD",
            "ROAD_BLOCK",
            "ACCIDENT",
            "VEHICLE_BREAKDOWN",
            "ROAD_DAMAGE",
            "WEATHER",
            "OTHER"
        ])
        .withMessage(
            "Invalid incident type"
        ),

    body("severity")
        .isIn([
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ])
        .withMessage(
            "Invalid incident severity"
        ),

    body("description")
        .trim()
        .notEmpty()
        .withMessage(
            "Incident description is required"
        ),

    body("location")
        .isObject()
        .withMessage(
            "Incident location is required"
        ),

    body("location.coordinates")
        .isArray({
            min: 2,
            max: 2
        })
        .withMessage(
            "Coordinates must be [longitude, latitude]"
        )
];


// --------------------------------------------------
// User creation validation
// --------------------------------------------------

const createUserValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage(
            "Name is required"
        ),

    body("email")
        .trim()
        .isEmail()
        .withMessage(
            "Valid email is required"
        )
        .normalizeEmail(),

    body("password")
        .isLength({
            min: 6
        })
        .withMessage(
            "Password must contain at least 6 characters"
        )
];


export {
    objectIdValidation,
    createVehicleValidation,
    createShipmentValidation,
    createIncidentValidation,
    createUserValidation
};