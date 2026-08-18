import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/user/auth",
    withCredentials: true
});

export async function register(Username, Email, Password) {
    try {
        const response = await api.post("/Register", {
            Username,
            Email,
            Password
        });

        return response;
    } catch (err) {
        throw err;
    }
}

export async function login(Username, Password) {
    try {
        const response = await api.post("/Login", {
            Username,
            Password
        });

        return response;
    } catch (err) {
        throw err;
    }
}

export async function GetProfile() {
    try {
        const response = await api.get("/GetProfile");

        return response.data;
    } catch (err) {
        throw err;
    }
}