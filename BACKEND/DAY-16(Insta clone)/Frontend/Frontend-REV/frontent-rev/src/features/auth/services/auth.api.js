import axios from "axios";

const api = axios.create({
 baseURL:"http://localhost:3000/api/user/auth",
 withCredentials:true,
})
 export async function register(Username,Email,Password){
    const response = await axios.post("http://localhost:3000/api/user/auth/register",{
        Username,Email,Password
    })
    return response
 }
 export async function login(Username,Password){
    const response = await api.post("/Login",{
        Username,Password
    })
    return response
 }
  export async function GetProfile(Username,Password){
    const response = await api.get("/GetProfile")
    return response
 }