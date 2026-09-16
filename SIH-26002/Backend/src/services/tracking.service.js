import Shipment from "../models/shipment.model.js";
import Vehicle from "../models/vehicle.model.js";
import RouteSegment
    from "../models/routeSegment.model.js";
import {
    getIO
} from "../socket.js";


const updateVehicleLocation =
    async ({
        vehicleId,
        coordinates
    }) => {

        const vehicle =
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


        vehicle.currentLocation = {
            type: "Point",
            coordinates
        };


        await vehicle.save();


        // -----------------------------------------
        // Find current route segment
        // -----------------------------------------

        let currentSegment = null;


        if (vehicle.currentShipment) {

            const shipment =
                await Shipment.findById(
                    vehicle.currentShipment
                );


            if (
                shipment &&
                shipment.route
            ) {

                currentSegment =
                    await RouteSegment.findOne({

                        route:
                            shipment.route,

                        startPoint: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates
                                },

                                $maxDistance: 10000
                            }
                        }
                    })
                    .sort({
                        segmentIndex: 1
                    });
            }
        }


        // -----------------------------------------
        // Update shipment
        // -----------------------------------------

        if (vehicle.currentShipment) {

            await Shipment.findByIdAndUpdate(
                vehicle.currentShipment,
                {
                    currentLocation: {
                        type: "Point",
                        coordinates
                    },

                    ...(currentSegment && {
                        currentSegment:
                            currentSegment._id
                    })
                }
            );


            // -----------------------------------------
            // Emit realtime location update
            // -----------------------------------------

            getIO()
                .to(
                    `shipment:${vehicle.currentShipment}`
                )
                .emit(
                    "vehicle-location-updated",
                    {
                        vehicleId:
                            vehicle._id,

                        coordinates,

                        currentSegment:
                            currentSegment
                                ? currentSegment._id
                                : null
                    }
                );
        }


        return vehicle;
    };


export {
    updateVehicleLocation
};