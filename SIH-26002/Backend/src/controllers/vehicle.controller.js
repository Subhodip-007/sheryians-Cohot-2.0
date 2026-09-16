import {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    assignDriver,
    unassignDriver,
    deleteVehicle
} from "../services/vehicle.service.js";


// --------------------------------------------------
// Create Vehicle
// --------------------------------------------------

const create = async (
    req,
    res,
    next
) => {

    try {

        const {
            registrationNumber,
            type,
            capacity
        } = req.body;


        const vehicle =
            await createVehicle({
                registrationNumber,
                type,
                capacity
            });


        res.status(201).json({

            success: true,

            message:
                "Vehicle created successfully",

            vehicle

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Get All Vehicles
// --------------------------------------------------

const getAll = async (
    req,
    res,
    next
) => {

    try {

        const {
            status,
            type
        } = req.query;


        const vehicles =
            await getAllVehicles({
                status,
                type
            });


        res.status(200).json({

            success: true,

            count: vehicles.length,

            vehicles

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Get One Vehicle
// --------------------------------------------------

const getOne = async (
    req,
    res,
    next
) => {

    try {

        const vehicle =
            await getVehicleById(
                req.params.id
            );


        res.status(200).json({

            success: true,

            vehicle

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Update Vehicle
// --------------------------------------------------

const update = async (
    req,
    res,
    next
) => {

    try {

        const vehicle =
            await updateVehicle(
                req.params.id,
                req.body
            );


        res.status(200).json({

            success: true,

            message:
                "Vehicle updated successfully",

            vehicle

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Assign Driver
// --------------------------------------------------

const assign = async (
    req,
    res,
    next
) => {

    try {

        const {
            driverId
        } = req.body;


        if (!driverId) {

            const error =
                new Error(
                    "driverId is required"
                );

            error.statusCode = 400;

            throw error;
        }


        const vehicle =
            await assignDriver(
                req.params.id,
                driverId
            );


        res.status(200).json({

            success: true,

            message:
                "Driver assigned successfully",

            vehicle

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Unassign Driver
// --------------------------------------------------

const unassign = async (
    req,
    res,
    next
) => {

    try {

        const vehicle =
            await unassignDriver(
                req.params.id
            );


        res.status(200).json({

            success: true,

            message:
                "Driver unassigned successfully",

            vehicle

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Delete Vehicle
// --------------------------------------------------

const remove = async (
    req,
    res,
    next
) => {

    try {

        await deleteVehicle(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message:
                "Vehicle deleted successfully"

        });

    } catch (error) {

        next(error);

    }
};


export {
    create,
    getAll,
    getOne,
    update,
    assign,
    unassign,
    remove
};