import { BrowserRouter, createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Getstarted from "./features/auth/pages/Getstarted";

const AppRouter =  createBrowserRouter([
    {
        path: "/",
        element: <Getstarted />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);
export default AppRouter