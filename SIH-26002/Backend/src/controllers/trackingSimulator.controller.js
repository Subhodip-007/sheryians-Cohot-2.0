import {
    startShipmentSimulation,
    stopShipmentSimulation,
    getSimulationStatus
} from "../services/trackingSimulator.service.js";


/* =========================================================
   START
========================================================= */

const start = async (
    req,
    res,
    next
) => {

    try {

        const {
            stepMs,
            stepsPerSegment
        } = req.body;


        const result =
            await startShipmentSimulation({

                shipmentId:
                    req.params.shipmentId,

                stepMs:
                    Number(stepMs) || 3000,

                stepsPerSegment:
                    Number(
                        stepsPerSegment
                    ) || 10

            });


        res.status(202).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};


/* =========================================================
   STOP
========================================================= */

const stop = (
    req,
    res
) => {

    const result =
        stopShipmentSimulation(
            req.params.shipmentId
        );


    res.status(200).json({

        success: true,

        ...result

    });

};


/* =========================================================
   STATUS
========================================================= */

const status = (
    req,
    res
) => {

    const result =
        getSimulationStatus(
            req.params.shipmentId
        );


    res.status(200).json({

        success: true,

        ...result

    });

};


export {
    start,
    stop,
    status
};