

import Protect from "./feature/auth/components/protect";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";

import { createBrowserRouter } from"react-router";
import Home from "./feature/Home/pages/Home";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Protect><Home/></Protect>
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