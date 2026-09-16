import Shipment from "../models/shipment.model.js";
import Vehicle from "../models/vehicle.model.js";
import User from "../models/user.model.js";
import Route from "../models/route.model.js";
import RouteSegment from "../models/routeSegment.model.js";

import {
    isValidShipmentTransition
} from "../utils/status.js";


// --------------------------------------------------
// Create Shipment
// --------------------------------------------------

const createShipment = async ({
    trackingId,
    origin,
    destination,
    cargoType,
    weight,
    vehicleId,
    driverId,
    routeId,
    currentSegmentId,
    eta
}) => {

    const normalizedTrackingId =
        trackingId.trim().toUpperCase();


    // ----------------------------------------------
    // Check duplicate tracking ID
    // ----------------------------------------------

    const existingShipment =
        await Shipment.findOne({
            trackingId:
                normalizedTrackingId
        });


    if (existingShipment) {

        const error =
            new Error(
                "Shipment with this tracking ID already exists"
            );

        error.statusCode = 409;

        throw error;
    }


    // ----------------------------------------------
    // Validate vehicle
    // ----------------------------------------------

    let vehicle = null;


    if (vehicleId) {

        vehicle =
            await Vehicle.findById(
                vehicleId
            );


        if (!vehicle) {

            const error =
                new Error(
                    "Vehicle not found"
                );

            error.statusCode = 404;

            throw error;
        }


        if (
            vehicle.status ===
            "MAINTENANCE"
        ) {

            const error =
                new Error(
                    "Vehicle is currently under maintenance"
                );

            error.statusCode = 400;

            throw error;
        }


        if (
            vehicle.status ===
            "INACTIVE"
        ) {

            const error =
                new Error(
                    "Vehicle is inactive"
                );

            error.statusCode = 400;

            throw error;
        }
    }


    // ----------------------------------------------
    // Validate driver
    // ----------------------------------------------

    let driver = null;


    if (driverId) {

        driver =
            await User.findById(
                driverId
            );


        if (!driver) {

            const error =
                new Error(
                    "Driver not found"
                );

            error.statusCode = 404;

            throw error;
        }


        if (
            driver.role !==
            "DRIVER"
        ) {

            const error =
                new Error(
                    "Selected user is not a driver"
                );

            error.statusCode = 400;

            throw error;
        }


        if (!driver.isActive) {

            const error =
                new Error(
                    "Driver account is inactive"
                );

            error.statusCode = 400;

            throw error;
        }
    }


    // ----------------------------------------------
    // Validate route
    // ----------------------------------------------

    let route = null;


    if (routeId) {

        route =
            await Route.findById(
                routeId
            );


        if (!route) {

            const error =
                new Error(
                    "Route not found"
                );

            error.statusCode = 404;

            throw error;
        }


        if (
            route.status ===
            "BLOCKED"
        ) {

            const error =
                new Error(
                    "Cannot assign a blocked route to shipment"
                );

            error.statusCode = 400;

            throw error;
        }
    }


    // ----------------------------------------------
    // Get first route segment
    // ----------------------------------------------

    let firstRouteSegment = null;


    if (routeId) {

        firstRouteSegment =
            await RouteSegment.findOne({
                route: routeId
            })
            .sort({
                segmentIndex: 1
            });
    }


    // ----------------------------------------------
    // Validate current route segment
    // ----------------------------------------------

    let currentSegment = null;


    if (currentSegmentId) {

        currentSegment =
            await RouteSegment.findById(
                currentSegmentId
            );


        if (!currentSegment) {

            const error =
                new Error(
                    "Current route segment not found"
                );

            error.statusCode = 404;

            throw error;
        }


        if (
            currentSegment.route.toString() !==
            routeId.toString()
        ) {

            const error =
                new Error(
                    "Current segment does not belong to the selected route"
                );

            error.statusCode = 400;

            throw error;
        }
    }


    // ----------------------------------------------
    // Validate vehicle-driver consistency
    // ----------------------------------------------

    if (
        vehicle &&
        driver
    ) {

        if (
            vehicle.assignedDriver &&
            vehicle.assignedDriver.toString() !==
                driver._id.toString()
        ) {

            const error =
                new Error(
                    "Selected driver is not assigned to this vehicle"
                );

            error.statusCode = 400;

            throw error;
        }
    }


    // ----------------------------------------------
    // Create Shipment
    // ----------------------------------------------

    const shipment =
        await Shipment.create({

            trackingId:
                normalizedTrackingId,

            origin,

            destination,

            cargoType,

            weight,

            vehicle:
                vehicleId || null,

            driver:
                driverId || null,

            route:
                routeId || null,

            // If currentSegmentId was provided,
            // use it. Otherwise start from the
            // first segment of the route.

            currentSegment:
                currentSegmentId ||
                (
                    firstRouteSegment
                        ? firstRouteSegment._id
                        : null
                ),

            eta:
                eta || null,

            status:
                vehicleId && routeId
                    ? "ASSIGNED"
                    : "PENDING"
        });


    // ----------------------------------------------
    // Update vehicle
    // ----------------------------------------------

    if (vehicle) {

        vehicle.currentShipment =
            shipment._id;

        vehicle.status =
            "ASSIGNED";

        await vehicle.save();
    }


    return shipment;
};


// --------------------------------------------------
// Get All Shipments
// --------------------------------------------------

const getAllShipments = async ({
    status
} = {}) => {

    const filter = {};


    if (status) {

        filter.status =
            status;
    }


    const shipments =
        await Shipment.find(
            filter
        )

        .populate(
            "vehicle",
            "registrationNumber type capacity status"
        )

        .populate(
            "driver",
            "name email role isActive"
        )

        .populate(
            "route",
            "name origin destination distance estimatedTime mode status"
        )

        .populate(
            "currentSegment",
            "name distance status riskScore accessibilityScore"
        )

        .sort({
            createdAt: -1
        });


    return shipments;
};


// --------------------------------------------------
// Get Shipment By ID
// --------------------------------------------------

const getShipmentById = async (
    shipmentId
) => {

    const shipment =
        await Shipment.findById(
            shipmentId
        )

        .populate(
            "vehicle",
            "registrationNumber type capacity status"
        )

        .populate(
            "driver",
            "name email role isActive"
        )

        .populate(
            "route",
            "name origin destination distance estimatedTime mode status"
        )

        .populate(
            "currentSegment",
            "name distance status riskScore accessibilityScore"
        );


    if (!shipment) {

        const error =
            new Error(
                "Shipment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    return shipment;
};


// --------------------------------------------------
// Update Shipment
// --------------------------------------------------

const updateShipment = async (
    shipmentId,
    data
) => {

    const shipment =
        await Shipment.findById(
            shipmentId
        );


    if (!shipment) {

        const error =
            new Error(
                "Shipment not found"
            );

        error.statusCode = 404;

        throw error;

    }


    const allowedUpdates = {};


    /* ==============================================
       CARGO TYPE
    ============================================== */

    if (
        data.cargoType !==
        undefined
    ) {

        allowedUpdates.cargoType =
            data.cargoType;

    }


    /* ==============================================
       WEIGHT
    ============================================== */

    if (
        data.weight !==
        undefined
    ) {

        allowedUpdates.weight =
            data.weight;

    }


    /* ==============================================
       STATUS
    ============================================== */

    if (
        data.status !==
        undefined
    ) {

        if (
            !isValidShipmentTransition(
                shipment.status,
                data.status
            )
        ) {

            const error =
                new Error(
                    `Invalid shipment status transition: ${shipment.status} → ${data.status}`
                );

            error.statusCode = 400;

            throw error;

        }


        allowedUpdates.status =
            data.status;

    }


    /* ==============================================
       ETA
    ============================================== */

    if (
        data.eta !==
        undefined
    ) {

        allowedUpdates.eta =
            data.eta;

    }


    /* ==============================================
       CURRENT LOCATION
    ============================================== */

    if (
        data.currentLocation !==
        undefined
    ) {

        allowedUpdates.currentLocation =
            data.currentLocation;

    }


    /* ==============================================
       ROUTE UPDATE
    ============================================== */

    if (
        data.routeId !==
        undefined
    ) {

        const route =
            await Route.findById(
                data.routeId
            );


        if (!route) {

            const error =
                new Error(
                    "Route not found"
                );

            error.statusCode = 404;

            throw error;

        }


        if (
            route.status ===
            "BLOCKED"
        ) {

            const error =
                new Error(
                    "Cannot assign a blocked route"
                );

            error.statusCode = 400;

            throw error;

        }


        /*
         * Find the first segment of
         * the newly selected route.
         */

        const firstSegment =
            await RouteSegment
                .findOne({
                    route:
                        route._id
                })
                .sort({
                    segmentIndex: 1
                });


        if (
            !firstSegment
        ) {

            const error =
                new Error(
                    "Selected route has no segments"
                );

            error.statusCode = 400;

            throw error;

        }


        allowedUpdates.route =
            route._id;


        /*
         * Unless the caller explicitly
         * provides another segment,
         * start from the first segment.
         */

        if (
            data.currentSegmentId ===
            undefined
        ) {

            allowedUpdates.currentSegment =
                firstSegment._id;

        }

    }


    /* ==============================================
       CURRENT SEGMENT
    ============================================== */

    if (
        data.currentSegmentId !==
        undefined
    ) {

        const segment =
            await RouteSegment.findById(
                data.currentSegmentId
            );


        if (!segment) {

            const error =
                new Error(
                    "Route segment not found"
                );

            error.statusCode = 404;

            throw error;

        }


        /*
         * Determine which route the shipment
         * will belong to after this update.
         */

        const targetRouteId =
            data.routeId !==
            undefined
                ? data.routeId
                : shipment.route;


        if (
            targetRouteId &&
            segment.route.toString() !==
                targetRouteId.toString()
        ) {

            const error =
                new Error(
                    "Route segment does not belong to shipment route"
                );

            error.statusCode = 400;

            throw error;

        }


        allowedUpdates.currentSegment =
            segment._id;

    }


    /* ==============================================
       UPDATE
    ============================================== */

    const updatedShipment =
        await Shipment.findByIdAndUpdate(
            shipmentId,
            allowedUpdates,
            {
                new: true,
                runValidators: true
            }
        )

        .populate(
            "vehicle",
            "registrationNumber type capacity status"
        )

        .populate(
            "driver",
            "name email role isActive"
        )

        .populate(
            "route",
            "name origin destination distance estimatedTime mode status"
        )

        .populate(
            "currentSegment",
            "name distance status riskScore accessibilityScore segmentIndex"
        );


    return updatedShipment;

};

// --------------------------------------------------
// Delete Shipment
// --------------------------------------------------

const deleteShipment = async (
    shipmentId
) => {

    const shipment =
        await Shipment.findById(
            shipmentId
        );


    if (!shipment) {

        const error =
            new Error(
                "Shipment not found"
            );

        error.statusCode = 404;

        throw error;
    }


    if (
        shipment.status ===
        "IN_TRANSIT"
    ) {

        const error =
            new Error(
                "Shipment cannot be deleted while in transit"
            );

        error.statusCode = 400;

        throw error;
    }


    // ----------------------------------------------
    // Release assigned vehicle
    // ----------------------------------------------

    if (
        shipment.vehicle
    ) {

        await Vehicle.findByIdAndUpdate(
            shipment.vehicle,
            {
                $set: {
                    currentShipment:
                        null,

                    status:
                        "AVAILABLE"
                }
            }
        );
    }


    await Shipment.findByIdAndDelete(
        shipmentId
    );
};


// --------------------------------------------------
// Exports
// --------------------------------------------------

export {
    createShipment,
    getAllShipments,
    getShipmentById,
    updateShipment,
    deleteShipment
};