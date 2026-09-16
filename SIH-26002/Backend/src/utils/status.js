const shipmentTransitions = {

    PENDING: [
        "ASSIGNED",
        "CANCELLED"
    ],

    ASSIGNED: [
        "IN_TRANSIT",
        "CANCELLED"
    ],

    IN_TRANSIT: [
        "DELAYED",
        "AT_RISK",
        "DELIVERED"
    ],

    DELAYED: [
        "IN_TRANSIT",
        "AT_RISK",
        "DELIVERED"
    ],

    AT_RISK: [
        "ASSIGNED",
        "IN_TRANSIT",
        "DELAYED",
        "DELIVERED"
    ],

    DELIVERED: [],

    CANCELLED: []
};


const isValidShipmentTransition = (
    currentStatus,
    nextStatus
) => {

    if (
        currentStatus ===
        nextStatus
    ) {
        return true;
    }


    return (
        shipmentTransitions[
            currentStatus
        ] || []
    ).includes(
        nextStatus
    );
};


export {
    isValidShipmentTransition
};