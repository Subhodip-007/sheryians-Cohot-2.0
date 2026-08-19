import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { login, register, GetProfile } from "../services/auth.api";

export const UseAuth = () => {
    const context = useContext(AuthContext);

    const { user, setuser, loading, setloading } = context;

    const handleLogin = async (Username, Password) => {
        setloading(true);

        const response = await login(Username, Password);

        setuser(response);
        setloading(false);
    };

    const handleRegister = async (Username, Email, Password) => {
        setloading(true);

        const response = await register(Username, Email, Password);

        setuser(response);
        setloading(false);
    };

    return {
        user,
        loading,
        handleRegister,
        handleLogin
    };
};