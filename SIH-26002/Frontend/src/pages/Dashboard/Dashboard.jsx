import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getMe
} from "../../api/auth.api";

import {
    getVehicles
} from "../../api/vehicle.api";

import {
    getShipments
} from "../../api/shipment.api";

import {
    getIncidents
} from "../../api/incident.api";

import DashboardSidebar
    from "../../components/dashboard/DashboardSidebar";

import "./dashboard.scss";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Dashboard = () => {

    const navigate =
        useNavigate();


    /* =====================================================
       USER
    ===================================================== */

    const [
        user,
        setUser
    ] = useState(null);


    /* =====================================================
       DASHBOARD DATA
    ===================================================== */

    const [
        shipments,
        setShipments
    ] = useState([]);


    const [
        vehicles,
        setVehicles
    ] = useState([]);


    const [
        incidents,
        setIncidents
    ] = useState([]);


    /* =====================================================
       COUNTS
    ===================================================== */

    const [
        shipmentCount,
        setShipmentCount
    ] = useState(0);


    const [
        vehicleCount,
        setVehicleCount
    ] = useState(0);


    const [
        incidentCount,
        setIncidentCount
    ] = useState(0);


    /* =====================================================
       LOADING
    ===================================================== */

    const [
        loading,
        setLoading
    ] = useState(true);


    /* =====================================================
       ERROR
    ===================================================== */

    const [
        error,
        setError
    ] = useState("");


    /* =====================================================
       LOAD DASHBOARD DATA
    ===================================================== */

    useEffect(() => {

        const loadDashboard =
            async () => {

                try {

                    /*
                     * User is required for authentication.
                     */

                    const userResult =
                        await getMe();


                    if (
                        !userResult?.success
                    ) {

                        throw new Error(
                            userResult?.message ||
                            "Authentication failed"
                        );

                    }


                    setUser(
                        userResult.user
                    );


                    /*
                     * Load operational data
                     * in parallel.
                     */

                    const [
                        vehicleResult,
                        shipmentResult,
                        incidentResult
                    ] = await Promise.all([
                        getVehicles(),
                        getShipments(),
                        getIncidents()
                    ]);


                    /* -------------------------------
                       VEHICLES
                    ------------------------------- */

                    if (
                        vehicleResult?.success
                    ) {

                        setVehicles(
                            vehicleResult.vehicles ||
                            []
                        );


                        setVehicleCount(
                            vehicleResult.count ??
                            0
                        );

                    }


                    /* -------------------------------
                       SHIPMENTS
                    ------------------------------- */

                    if (
                        shipmentResult?.success
                    ) {

                        setShipments(
                            shipmentResult.shipments ||
                            []
                        );


                        setShipmentCount(
                            shipmentResult.count ??
                            0
                        );

                    }


                    /* -------------------------------
                       INCIDENTS
                    ------------------------------- */

                    if (
                        incidentResult?.success
                    ) {

                        setIncidents(
                            incidentResult.incidents ||
                            []
                        );


                        setIncidentCount(
                            incidentResult.count ??
                            0
                        );

                    }

                } catch (error) {

                    console.error(
                        "Dashboard load error:",
                        error
                    );


                    setError(
                        error.message ||
                        "Unable to load dashboard"
                    );


                    navigate(
                        "/login",
                        {
                            replace: true
                        }
                    );

                } finally {

                    setLoading(false);

                }

            };


        loadDashboard();

    }, [navigate]);


    /* =====================================================
       LOADING
    ===================================================== */
if (loading) {
    return (
        <main className="dashboard-loading">
            <div className="loading-container">

                <div className="loading-animation">
                    <DotLottieReact
                        src="https://lottie.host/3ad87410-0c70-46dc-83ee-7f33e387d5d0/RmcY8fLd94.lottie"
                        loop
                        autoplay
                    />
                </div>

                <p className="loading-text">
                    SETU.NER loading<span className="loading-dots">...</span>
                </p>

            </div>
        </main>
    );
}

    /* =====================================================
       AUTH FAILED
    ===================================================== */

    if (error || !user) {

        return null;

    }


    /* =====================================================
       CURRENT OPERATIONS DATA
    ===================================================== */

    const currentShipment =
        shipments[0] || null;


    const currentVehicle =
        vehicles[0] || null;


    const currentIncident =
        incidents[0] || null;


    /* =====================================================
       DASHBOARD
    ===================================================== */

    return (

        <main className="dashboard-shell">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <DashboardSidebar
                user={user}
            />


            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="dashboard-content">

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="dashboard-header">

                    <div>

                        <p className="dashboard-kicker">
                            NER CONTROL CENTER
                        </p>


                        <h1>
                            Good to see you,
                            <br />
                            {user.name}.
                        </h1>

                    </div>


                    <div className="dashboard-user">

                        <span>
                            {user.role}
                        </span>


                        <strong>
                            {user.email}
                        </strong>

                    </div>

                </header>


                {/* =================================================
                    STAT CARDS
                ================================================= */}

                <section className="dashboard-grid">

                    <article className="dashboard-card">

                        <span>
                            Active Shipments
                        </span>

                        <strong>
                            {shipmentCount}
                        </strong>

                    </article>


                    <article className="dashboard-card">

                        <span>
                            Vehicles
                        </span>

                        <strong>
                            {vehicleCount}
                        </strong>

                    </article>


                    <article className="dashboard-card">

                        <span>
                            Active Incidents
                        </span>

                        <strong>
                            {incidentCount}
                        </strong>

                    </article>


                    <article className="dashboard-card">

                        <span>
                            At Risk
                        </span>

                        <strong>
                            —
                        </strong>

                    </article>

                </section>


                {/* =================================================
                    CURRENT OPERATIONS
                ================================================= */}

                <section className="dashboard-operations">

                    <div className="dashboard-operations-header">

                        <div>

                            <span>
                                CURRENT OPERATIONS
                            </span>

                            <h2>
                                Network activity
                            </h2>

                        </div>

                    </div>


                    <div className="operations-grid">

                        {/* =========================================
                            SHIPMENT
                        ========================================= */}

                        <article className="operation-card">

                            <span className="operation-label">
                                SHIPMENT
                            </span>


                            {currentShipment ? (

                                <>

                                    <h3>
                                        {
                                            currentShipment.trackingId
                                        }
                                    </h3>


                                    <div className="operation-route">

                                        <span>
                                            {
                                                currentShipment
                                                    .origin
                                                    ?.name ||
                                                "Unknown"
                                            }
                                        </span>

                                        <span>
                                            →
                                        </span>

                                        <span>
                                            {
                                                currentShipment
                                                    .destination
                                                    ?.name ||
                                                "Unknown"
                                            }
                                        </span>

                                    </div>


                                    <div className="operation-meta">

                                        <div>

                                            <span>
                                                STATUS
                                            </span>

                                            <strong>
                                                {
                                                    currentShipment
                                                        .status
                                            }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                CARGO
                                            </span>

                                            <strong>
                                                {
                                                    currentShipment
                                                        .cargoType ||
                                                    "—"
                                            }
                                            </strong>

                                        </div>

                                    </div>

                                </>

                            ) : (

                                <p className="operation-empty">
                                    No active shipment data.
                                </p>

                            )}

                        </article>


                        {/* =========================================
                            VEHICLE
                        ========================================= */}

                        <article className="operation-card">

                            <span className="operation-label">
                                VEHICLE
                            </span>


                            {currentVehicle ? (

                                <>

                                    <h3>
                                        {
                                            currentVehicle
                                                .registrationNumber
                                        }
                                    </h3>


                                    <div className="operation-route">

                                        <span>
                                            {
                                                currentVehicle
                                                    .type ||
                                                "Vehicle"
                                            }
                                        </span>

                                        <span>
                                            •
                                        </span>

                                        <span>
                                            {
                                                currentVehicle
                                                    .status ||
                                                "UNKNOWN"
                                            }
                                        </span>

                                    </div>


                                    <div className="operation-meta">

                                        <div>

                                            <span>
                                                DRIVER
                                            </span>

                                            <strong>
                                                {
                                                    currentVehicle
                                                        .assignedDriver
                                                        ?.name ||
                                                    "Unassigned"
                                            }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                SHIPMENT
                                            </span>

                                            <strong>
                                                {
                                                    currentVehicle
                                                        .currentShipment
                                                        ?.trackingId ||
                                                    "None"
                                            }
                                            </strong>

                                        </div>

                                    </div>

                                </>

                            ) : (

                                <p className="operation-empty">
                                    No vehicle data.
                                </p>

                            )}

                        </article>


                        {/* =========================================
                            INCIDENT
                        ========================================= */}

                        <article
                            className="
                                operation-card
                                operation-card-alert
                            "
                        >

                            <span className="operation-label">
                                LATEST INCIDENT
                            </span>


                            {currentIncident ? (

                                <>

                                    <h3>
                                        {
                                            currentIncident
                                                .type ||
                                            "Incident"
                                        }
                                    </h3>


                                    <div className="incident-severity">

                                        <span>
                                            {
                                                currentIncident
                                                    .severity ||
                                                "UNKNOWN"
                                            }
                                        </span>

                                    </div>


                                    <p className="incident-description">

                                        {
                                            currentIncident
                                                .description ||
                                            "No description available."
                                        }

                                    </p>


                                    <div className="operation-meta">

                                        <div>

                                            <span>
                                                STATUS
                                            </span>

                                            <strong>
                                                {
                                                    currentIncident
                                                        .status ||
                                                    "UNKNOWN"
                                            }
                                            </strong>

                                        </div>

                                    </div>

                                </>

                            ) : (

                                <p className="operation-empty">
                                    No active incidents.
                                </p>

                            )}

                        </article>

                    </div>

                </section>


                {/* =================================================
                    LOWER CONTENT
                ================================================= */}

                <section className="dashboard-main">

                    {/* =================================================
                        MAP
                    ================================================= */}

                    <div
                        className="
                            dashboard-panel
                            dashboard-map-panel
                        "
                    >

                        <div
                            className="
                                dashboard-panel-header
                            "
                        >

                            <div>

                                <span>
                                    LIVE NETWORK
                                </span>

                                <h2>
                                    Network overview
                                </h2>

                            </div>


                            <span className="status-pill">
                                ONLINE
                            </span>

                        </div>


                        <div
                            className="
                                dashboard-map-placeholder
                            "
                        >

                            <span>
                                LIVE MAP
                            </span>


                            <p>
                                Map integration will be
                                connected next.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        ACCOUNT
                    ================================================= */}

                    <aside
                        className="
                            dashboard-panel
                            dashboard-side-panel
                        "
                    >

                        <div
                            className="
                                dashboard-panel-header
                            "
                        >

                            <div>

                                <span>
                                    ACCOUNT
                                </span>

                                <h2>
                                    {user.role}
                                </h2>

                            </div>

                        </div>


                        <div className="dashboard-account">

                            <div className="account-row">

                                <span>
                                    Name
                                </span>

                                <strong>
                                    {user.name}
                                </strong>

                            </div>


                            <div className="account-row">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {user.email}
                                </strong>

                            </div>


                            <div className="account-row">

                                <span>
                                    Role
                                </span>

                                <strong>
                                    {user.role}
                                </strong>

                            </div>

                        </div>

                    </aside>

                </section>

            </section>

        </main>
    );
};


export default Dashboard;