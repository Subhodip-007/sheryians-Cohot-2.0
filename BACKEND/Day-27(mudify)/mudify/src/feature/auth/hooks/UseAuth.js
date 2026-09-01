import { useContext, useEffect } from "react";

import { login, register, getME, logout } from "../services/auth.api";

import { AuthContext } from "../context/auth.context";

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user , setUser , loading , setloading} = context

    async function handleRegister(username,email,password) {
        setloading(true)
        const data = await register({email,username,password})
        setUser(data.user)
        setloading(false)

        
    }
 async function handleLogin({ username, password }) {
    try {
        setloading(true);

        const data = await login({ username, password });

        console.log("LOGIN RESPONSE:", data);
        console.log("USER FROM LOGIN:", data.user);

        setUser(data.user);
    } catch (error) {
        console.log("LOGIN ERROR:", error);
        setUser(null);
    } finally {
        setloading(false);
    }
}
    async function handleGetME() {
    try {
        setloading(true);

        const data = await getME();

        setUser(data.user);
    } catch (error) {
        setUser(null);
    } finally {
        setloading(false);
    }
}
    async function handleLogout() {
        setloading(true)
        const data = await logout()
        setUser(null)
        setloading(false)
    }
    useEffect(()=>{
        handleGetME()
    },[])
    return({
        user,loading,handleLogin,handleLogout,handleRegister,handleGetME,
    })
}