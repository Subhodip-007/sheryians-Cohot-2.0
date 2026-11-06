import React, { useEffect } from "react";
import { router } from "./app.routes";
import { RouterProvider } from "react-router";
import { useAuth } from "../features/auth/hook/useAuth";

const App = () => {
    const { handleGetMe } = useAuth();

    useEffect(() => {
        handleGetMe().catch((err) => {
            console.log("Authentication initialization failed:", err);
        });
    }, []);

    return <RouterProvider router={router} />;
};

export default App;