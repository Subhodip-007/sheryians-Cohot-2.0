import axios from "axios";


const vehicleApi = axios.create({

    baseURL: "http://localhost:3000/api",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }

});


export const getVehicles = async () => {

    try {

        const response =
            await vehicleApi.get(
                "/vehicles"
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Unable to fetch vehicles"
        );

    }

};