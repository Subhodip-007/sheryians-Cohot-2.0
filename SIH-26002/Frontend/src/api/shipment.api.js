import axios from "axios";


const shipmentApi = axios.create({

    baseURL: "http://localhost:3000/api",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }

});


export const getShipments = async () => {

    try {

        const response =
            await shipmentApi.get(
                "/shipments"
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch shipments"
        );

    }

};


export const getShipmentById = async (
    shipmentId
) => {

    try {

        const response =
            await shipmentApi.get(
                `/shipments/${shipmentId}`
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch shipment"
        );

    }

};