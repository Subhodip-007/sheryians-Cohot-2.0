import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/user/",
    withCredentials: true
});

export async function getFeed() {
    const response = await api.get("/post/feed");

    console.log("Axios response:", response);
    console.log("Feed payload:", response.data);

    return response.data;
}
