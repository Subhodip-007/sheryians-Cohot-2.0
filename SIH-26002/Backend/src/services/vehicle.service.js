import Vehicle from "../models/vehicle.model.js";
import User from "../models/user.model.js";


// --------------------------------------------------
// Create Vehicle
// --------------------------------------------------

const createVehicle = async ({
    registrationNumber,
    type,
    capacity
}) => {

    const normalizedRegistration =
        registrationNumber
            .trim()
            .toUpperCase();


    const existingVehicle =
        await Vehicle.findOne({
            registrationNumber:
                normalizedRegistration
        });


    if (existingVehicle) {

        const error = new Error(
            "Vehicle with this registration number already exists"
        );

        error.statusCode = 409;

        throw error;
    }


    const vehicle =
        await Vehicle.create({

            registrationNumber:
                normalizedRegistration,

            type,

            capacity

        });


    return vehicle;
};


// --------------------------------------------------
// Get All Vehicles
// --------------------------------------------------

const getAllVehicles = async ({
    status,
    type
} = {}) => {

    const filter = {};


    if (status) {
        filter.status = status;
    }


    if (type) {
        filter.type = type;
    }


    const vehicles =
    await Vehicle.find(filter)
        .populate(
            "assignedDriver",
            "name email role isActive"
        )
        .populate(
            "currentShipment",
            "trackingId status"
        )
        .sort({
            createdAt: -1
        });


    return vehicles;
};


// --------------------------------------------------
// Get Vehicle By ID
// --------------------------------------------------

const getVehicleById = async (
    vehicleId
) => {

    const vehicle =
        await Vehicle.findById(vehicleId)
            .populate(
                "assignedDriver",
                "name email role isActive"
            )
             .populate(
        "currentShipment",
        "trackingId status"
    );


    if (!vehicle) {

        const error = new Error(
            "Vehicle not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return vehicle;
};


// --------------------------------------------------
// Update Vehicle
// --------------------------------------------------

const updateVehicle = async (
    vehicleId,
    data
) => {

    const vehicle =
        await Vehicle.findById(
            vehicleId
        );


    if (!vehicle) {

        const error = new Error(
            "Vehicle not found"
        );

        error.statusCode = 404;

        throw error;
    }


    const allowedUpdates = {};


    if (
        data.registrationNumber !==
        undefined
    ) {

        const normalizedRegistration =
            data.registrationNumber
                .trim()
                .toUpperCase();


        const existingVehicle =
            await Vehicle.findOne({
                registrationNumber:
                    normalizedRegistration,

                _id: {
                    $ne: vehicleId
                }
            });


        if (existingVehicle) {

            const error = new Error(
                "Vehicle with this registration number already exists"
            );

            error.statusCode = 409;

            throw error;
        }


        allowedUpdates.registrationNumber =
            normalizedRegistration;
    }


    if (data.type !== undefined) {
        allowedUpdates.type = data.type;
    }


    if (data.capacity !== undefined) {
        allowedUpdates.capacity =
            data.capacity;
    }


    if (data.status !== undefined) {
        allowedUpdates.status =
            data.status;
    }


    if (
        data.currentLocation !==
        undefined
    ) {

        allowedUpdates.currentLocation =
            data.currentLocation;
    }


    const updatedVehicle =
        await Vehicle.findByIdAndUpdate(
            vehicleId,
            allowedUpdates,
            {
                new: true,
                runValidators: true
            }
        )
        .populate(
            "assignedDriver",
            "name email role isActive"
        )
        .populate(
            "currentShipment",
            "trackingId status"
        );


    return updatedVehicle;
};


// --------------------------------------------------
// Assign Driver
// --------------------------------------------------

const assignDriver = async (
    vehicleId,
    driverId
) => {

    const vehicle =
        await Vehicle.findById(
            vehicleId
        );


    if (!vehicle) {

        const error = new Error(
            "Vehicle not found"
        );

        error.statusCode = 404;

        throw error;
    }


    const driver =
        await User.findById(
            driverId
        );


    if (!driver) {

        const error = new Error(
            "Driver not found"
        );

        error.statusCode = 404;

        throw error;
    }


    if (
        driver.role !== "DRIVER"
    ) {

        const error = new Error(
            "Selected user is not a driver"
        );

        error.statusCode = 400;

        throw error;
    }


    if (!driver.isActive) {

        const error = new Error(
            "This driver account is inactive"
        );

        error.statusCode = 400;

        throw error;
    }


    const existingVehicle =
        await Vehicle.findOne({
            assignedDriver: driverId,
            _id: {
                $ne: vehicleId
            }
        });


    if (existingVehicle) {

        const error = new Error(
            "This driver is already assigned to another vehicle"
        );

        error.statusCode = 409;

        throw error;
    }


    vehicle.assignedDriver =
        driverId;


    if (
        vehicle.status ===
        "AVAILABLE"
    ) {
        vehicle.status =
            "ASSIGNED";
    }


    await vehicle.save();


    return Vehicle.findById(
        vehicleId
    ).populate(
        "assignedDriver",
        "name email role isActive"
    );
};


// --------------------------------------------------
// Unassign Driver
// --------------------------------------------------

const unassignDriver = async (
    vehicleId
) => {

    const vehicle =
        await Vehicle.findById(
            vehicleId
        );


    if (!vehicle) {

        const error = new Error(
            "Vehicle not found"
        );

        error.statusCode = 404;

        throw error;
    }


    vehicle.assignedDriver = null;


    if (
        vehicle.status ===
        "ASSIGNED"
    ) {
        vehicle.status =
            "AVAILABLE";
    }


    await vehicle.save();


    return vehicle;
};


// --------------------------------------------------
// Delete Vehicle
// --------------------------------------------------

const deleteVehicle = async (
    vehicleId
) => {

    const vehicle =
        await Vehicle.findById(
            vehicleId
        );


    if (!vehicle) {

        const error = new Error(
            "Vehicle not found"
        );

        error.statusCode = 404;

        throw error;
    }


    if (
        vehicle.currentShipment
    ) {

        const error = new Error(
            "Vehicle cannot be deleted while assigned to a shipment"
        );

        error.statusCode = 400;

        throw error;
    }


    if (
        vehicle.status ===
        "IN_TRANSIT"
    ) {

        const error = new Error(
            "Vehicle cannot be deleted while in transit"
        );

        error.statusCode = 400;

        throw error;
    }


    await Vehicle.findByIdAndDelete(
        vehicleId
    );
};


export {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    assignDriver,
    unassignDriver,
    deleteVehicle
};