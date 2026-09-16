import {
    generateReroutingOptions,
    rerouteShipment
} from "../services/rerouting.service.js";


// --------------------------------------------------
// Generate options for incident
// --------------------------------------------------

const generateOptions = async (
    req,
    res,
    next
) => {

    try {

        const options =
            await generateReroutingOptions(
                req.params.incidentId
            );


        res.status(200).json({

            success: true,

            count:
                options.length,

            options

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Generate recommendation for shipment
// --------------------------------------------------

const generateForShipment =
    async (
        req,
        res,
        next
    ) => {

        try {

            const recommendation =
                await rerouteShipment(
                    req.params.shipmentId
                );


            res.status(201).json({

                success: true,

                message:
                    "Rerouting recommendation generated",

                recommendation

            });

        } catch (error) {

            next(error);

        }
    };


export {
    generateOptions,
    generateForShipment
};