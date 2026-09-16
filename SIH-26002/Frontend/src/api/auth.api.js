import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }
});


export const loginUser = async ({
    email,
    password
}) => {
    try {
        const response = await authApi.post(
            "/login",
            {
                email,
                password
            }
        );

        return response.data;

    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Login failed"
        );
    }
};


export const getMe = async () => {
    try {
        const response =
            await authApi.get("/me");

        return response.data;

    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Authentication check failed"
        );
    }
};


export const logoutUser = async () => {
    try {
        const response =
            await authApi.post("/logout");

        return response.data;

    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Logout failed"
        );
    }
};