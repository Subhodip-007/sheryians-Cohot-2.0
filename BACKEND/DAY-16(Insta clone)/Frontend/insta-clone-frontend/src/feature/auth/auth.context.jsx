import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const authContext = createContext();

export function AuthProvider({ children }) {
    const [User, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (Username, Password) => {
        setLoading(true);

        try {
            const response = await login(Username, Password);
            setUser(response);
            console.log(response);
            
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (Username, Email, Password) => {
        setLoading(true);

        try {
            const response = await register(Username, Email, Password);
            setUser(response);
            console.log(response);
            
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <authContext.Provider
            value={{
                User,
                loading,
                handleLogin,
                handleRegister
            }}
        >
            {children}
        </authContext.Provider>
    );
}