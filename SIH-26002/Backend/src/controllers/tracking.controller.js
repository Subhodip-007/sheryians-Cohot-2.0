import {
    updateVehicleLocation
} from "../services/tracking.service.js";
import {
    updateShipmentLocation
} from "../services/shipmentTracking.service.js";

const updateLocation = async (
    req,
    res,
    next
) => {

    try {

        const {
            coordinates
        } = req.body;


        if (
            !Array.isArray(
                coordinates
            ) ||
            coordinates.length !== 2
        ) {

            const error =
                new Error(
                    "Coordinates must be [longitude, latitude]"
                );

            error.statusCode = 400;

            throw error;
        }


        const vehicle =
            await updateVehicleLocation({

                vehicleId:
                    req.params.vehicleId,

                coordinates

            });


        res.status(200).json({

            success: true,

            message:
                "Vehicle location updated",

            location:
                vehicle.currentLocation

        });

    } catch (error) {

        next(error);

    }
};
const updateShipment = async (
    req,
    res,
    next
) => {

    try {

        const {
            coordinates
        } = req.body;


        if (
            !Array.isArray(coordinates) ||
            coordinates.length !== 2
        ) {

            const error =
                new Error(
                    "Coordinates must be [longitude, latitude]"
                );

            error.statusCode = 400;

            throw error;
        }


        const shipment =
            await updateShipmentLocation(
                req.params.shipmentId,
                coordinates
            );


        res.status(200).json({

            success: true,

            message:
                "Shipment location updated",

            shipment

        });

    } catch (error) {

        next(error);

    }
};
export {
    updateLocation,
    updateShipment
};