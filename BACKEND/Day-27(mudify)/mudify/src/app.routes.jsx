

import Protect from "./feature/auth/components/protect";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";

import { createBrowserRouter } from"react-router";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Protect><h1>Home</h1></Protect>
    },
    {
        path:"/register",
        element:<Register/>   
    },
    {
        path:"/login",
        element:<Login/>   
    }

])