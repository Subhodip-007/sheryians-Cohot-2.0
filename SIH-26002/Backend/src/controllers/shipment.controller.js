import {
    createShipment,
    getAllShipments,
    getShipmentById,
    updateShipment,
    deleteShipment
} from "../services/shipment.service.js";


// --------------------------------------------------
// Create Shipment
// --------------------------------------------------

const create = async (
    req,
    res,
    next
) => {

    try {

        const shipment =
            await createShipment(
                req.body
            );


        res.status(201).json({

            success: true,

            message:
                "Shipment created successfully",

            shipment

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Get All
// --------------------------------------------------

const getAll = async (
    req,
    res,
    next
) => {

    try {

        const {
            status
        } = req.query;


        const shipments =
            await getAllShipments({
                status
            });


        res.status(200).json({

            success: true,

            count: shipments.length,

            shipments

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Get One
// --------------------------------------------------

const getOne = async (
    req,
    res,
    next
) => {

    try {

        const shipment =
            await getShipmentById(
                req.params.id
            );


        res.status(200).json({

            success: true,

            shipment

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Update
// --------------------------------------------------

const update = async (
    req,
    res,
    next
) => {

    try {

        const shipment =
            await updateShipment(
                req.params.id,
                req.body
            );


        res.status(200).json({

            success: true,

            message:
                "Shipment updated successfully",

            shipment

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Delete
// --------------------------------------------------

const remove = async (
    req,
    res,
    next
) => {

    try {

        await deleteShipment(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message:
                "Shipment deleted successfully"

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
    remove
};