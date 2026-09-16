import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Landing
    from "./pages/Landing";

import Login
    from "./pages/login/Login";

import Dashboard
    from "./pages/Dashboard/Dashboard";
import Shipments
    from "./pages/shipments/Shipments";
import ShipmentDetails
    from "./pages/ShipmentDetails/ShipmentDetails";
    import Map
    from "./pages/map/Map";
import SmoothScroll
    from "./components/SmoothScroll";
import Incidents
    from "./pages/Incidents/Incidents";
    import IncidentDetails
    from "./pages/IncidentDetails/IncidentDetails";
import Rerouting
    from "./pages/Rerouting/Rerouting";
const App = () => {

    return (

        <BrowserRouter>

            <SmoothScroll />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Landing />
                    }
                />


                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                />

                    <Route
    path="/shipments"
    element={<Shipments />}
/>
<Route
    path="/shipments/:id"
    element={
        <ShipmentDetails />
    }
/>
<Route
    path="/map"
    element={<Map />}
/>
<Route
    path="/incidents"
    element={
        <Incidents />
    }
/>
<Route
    path="/incidents/:id"
    element={
        <IncidentDetails />
    }
/>
<Route
    path="/rerouting"
    element={
        <Rerouting />
    }
/>
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
};


export default App;