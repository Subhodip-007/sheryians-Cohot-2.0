import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getMe
} from "../../api/auth.api";

import {
    getShipmentById
} from "../../api/shipment.api";

import DashboardSidebar
    from "../../components/dashboard/DashboardSidebar";

import "./shipment-details.scss";


const ShipmentDetails = () => {

    const {
        id
    } = useParams();


    const navigate =
        useNavigate();


    const [
        user,
        setUser
    ] = useState(null);


    const [
        shipment,
        setShipment
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    useEffect(() => {

        const loadPage =
            async () => {

                try {

                    const [
                        userResult,
                        shipmentResult
                    ] = await Promise.all([
                        getMe(),
                        getShipmentById(id)
                    ]);


                    if (
                        !userResult?.success
                    ) {

                        throw new Error(
                            userResult?.message ||
                            "Authentication failed"
                        );

                    }


                    if (
                        !shipmentResult?.success
                    ) {

                        throw new Error(
                            shipmentResult?.message ||
                            "Unable to fetch shipment"
                        );

                    }


                    setUser(
                        userResult.user
                    );


                    setShipment(
                        shipmentResult.shipment
                    );

                } catch (error) {

                    console.error(
                        "Shipment details error:",
                        error
                    );


                    setError(
                        error.message ||
                        "Unable to load shipment"
                    );

                } finally {

                    setLoading(false);

                }

            };


        loadPage();

    }, [id]);


    if (loading) {

        return (
            <main className="shipment-details-loading">
                Loading shipment...
            </main>
        );

    }


    if (error || !shipment || !user) {

        return (

            <main className="shipment-details-error">

                <p>
                    {error ||
                        "Shipment not found"}
                </p>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/shipments"
                        )
                    }
                >
                    ← Back to Shipments
                </button>

            </main>
        );

    }


    const routeDistance =
        shipment.route?.distance ??
        0;


    const estimatedMinutes =
        shipment.route?.estimatedTime ??
        0;


    const estimatedHours =
        Math.floor(
            estimatedMinutes / 60
        );


    const remainingMinutes =
        estimatedMinutes % 60;


    return (

        <main className="dashboard-shell">

            <DashboardSidebar
                user={user}
            />


            <section
                className="
                    dashboard-content
                    shipment-details-page
                "
            >

                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    className="shipment-back"
                    onClick={() =>
                        navigate(
                            "/shipments"
                        )
                    }
                >
                    ← Shipments
                </button>


                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="shipment-details-header">

                    <div>

                        <p className="dashboard-kicker">
                            SHIPMENT DETAILS
                        </p>


                        <h1>
                            {shipment.trackingId}
                        </h1>


                        <div className="shipment-details-route">

                            <span>
                                {
                                    shipment
                                        .origin
                                        ?.name ||
                                    "Unknown"
                                }
                            </span>


                            <span className="details-route-arrow">
                                →
                            </span>


                            <span>
                                {
                                    shipment
                                        .destination
                                        ?.name ||
                                    "Unknown"
                                }
                            </span>

                        </div>

                    </div>


                    <div
                        className={
                            `shipment-details-status status-${shipment.status?.toLowerCase()}`
                        }
                    >
                        {shipment.status}
                    </div>

                </header>


                {/* =================================================
                    OVERVIEW
                ================================================= */}

                <section className="shipment-overview-grid">

                    <article className="shipment-detail-card">

                        <span>
                            CARGO
                        </span>


                        <strong>
                            {
                                shipment.cargoType ||
                                "—"
                            }
                        </strong>


                        <small>
                            {
                                shipment.weight ??
                                "—"
                            } kg
                        </small>

                    </article>


                    <article className="shipment-detail-card">

                        <span>
                            VEHICLE
                        </span>


                        <strong>
                            {
                                shipment
                                    .vehicle
                                    ?.registrationNumber ||
                                "—"
                            }
                        </strong>


                        <small>
                            {
                                shipment
                                    .vehicle
                                    ?.type ||
                                "—"
                            }
                        </small>

                    </article>


                    <article className="shipment-detail-card">

                        <span>
                            DRIVER
                        </span>


                        <strong>
                            {
                                shipment
                                    .driver
                                    ?.name ||
                                "Unassigned"
                            }
                        </strong>


                        <small>
                            {
                                shipment
                                    .driver
                                    ?.email ||
                                "—"
                            }
                        </small>

                    </article>


                    <article className="shipment-detail-card">

                        <span>
                            ROUTE
                        </span>


                        <strong>
                            {routeDistance} km
                        </strong>


                        <small>
                            {estimatedHours}h{" "}
                            {remainingMinutes}m
                            estimated
                        </small>

                    </article>

                </section>


                {/* =================================================
                    MAIN
                ================================================= */}

                <section className="shipment-details-main">

                    {/* =================================================
                        MAP
                    ================================================= */}

                    <div
                        className="
                            shipment-details-panel
                            shipment-route-panel
                        "
                    >

                        <div className="shipment-panel-heading">

                            <div>

                                <span>
                                    ROUTE
                                </span>


                                <h2>
                                    {shipment
                                        .route
                                        ?.name ||
                                        "Current route"}
                                </h2>

                            </div>


                            <span className="route-status">
                                {
                                    shipment
                                        .route
                                        ?.status ||
                                    "UNKNOWN"
                                }
                            </span>

                        </div>


                        <div className="shipment-map-placeholder">

                            <div className="map-route-line">

                                <span className="map-node start" />

                                <div className="map-line" />

                                <span className="map-node end" />

                            </div>


                            <div className="map-route-labels">

                                <span>
                                    {
                                        shipment
                                            .origin
                                            ?.name ||
                                        "Origin"
                                    }
                                </span>


                                <span>
                                    {
                                        shipment
                                            .destination
                                            ?.name ||
                                        "Destination"
                                    }
                                </span>

                            </div>


                            <p>
                                Live route map will be
                                connected in the Map page.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    <aside
                        className="
                            shipment-details-panel
                            shipment-summary-panel
                        "
                    >

                        <div className="shipment-panel-heading">

                            <div>

                                <span>
                                    STATUS
                                </span>


                                <h2>
                                    Shipment summary
                                </h2>

                            </div>

                        </div>


                        <div className="shipment-summary-list">

                            <div>

                                <span>
                                    Current status
                                </span>


                                <strong>
                                    {shipment.status}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Current segment
                                </span>


                                <strong>
                                    {
                                        shipment.currentSegment ||
                                        "Not assigned"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    ETA
                                </span>


                                <strong>
                                    {
                                        shipment.eta
                                            ? new Date(
                                                shipment.eta
                                            ).toLocaleString()
                                            : "Not available"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Mode
                                </span>


                                <strong>
                                    {
                                        shipment
                                            .route
                                            ?.mode ||
                                        "—"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Risk
                                </span>


                                <strong className="not-available">
                                    Not available
                                </strong>

                            </div>

                        </div>

                    </aside>

                </section>


                {/* =================================================
                    INCIDENT / REROUTING PLACEHOLDER
                ================================================= */}

                <section className="shipment-next-section">

                    <div>

                        <span>
                            INTELLIGENCE
                        </span>


                        <h2>
                            Risk and rerouting
                        </h2>


                        <p>
                            Incident impact, route risk,
                            alternative routes and operator
                            rerouting decisions will appear
                            here once the live route
                            intelligence layer is connected.
                        </p>

                    </div>

                </section>

            </section>

        </main>
    );
};


export default ShipmentDetails;