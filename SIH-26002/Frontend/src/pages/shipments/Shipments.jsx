import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getShipments
} from "../../api/shipment.api";

import DashboardSidebar
    from "../../components/dashboard/DashboardSidebar";

import {
    getMe
} from "../../api/auth.api";

import "./shipments.scss";


const FILTERS = [
    "ALL",
    "ASSIGNED",
    "IN_TRANSIT",
    "DELIVERED"
];


const Shipments = () => {

    const navigate =
        useNavigate();


    const [
        user,
        setUser
    ] = useState(null);


    const [
        shipments,
        setShipments
    ] = useState([]);


    const [
        search,
        setSearch
    ] = useState("");


    const [
        activeFilter,
        setActiveFilter
    ] = useState("ALL");


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
                        getShipments()
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
                            "Unable to fetch shipments"
                        );

                    }


                    setUser(
                        userResult.user
                    );


                    setShipments(
                        shipmentResult.shipments ||
                        []
                    );

                } catch (error) {

                    console.error(
                        "Shipments page error:",
                        error
                    );


                    setError(
                        error.message ||
                        "Unable to load shipments"
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


        loadPage();

    }, [navigate]);


    const filteredShipments =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();


            return shipments.filter(
                (shipment) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        shipment.trackingId
                            ?.toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        shipment.origin?.name
                            ?.toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        shipment.destination?.name
                            ?.toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        shipment.vehicle
                            ?.registrationNumber
                            ?.toLowerCase()
                            .includes(
                                normalizedSearch
                            );


                    const matchesFilter =
                        activeFilter === "ALL" ||
                        shipment.status ===
                            activeFilter;


                    return (
                        matchesSearch &&
                        matchesFilter
                    );

                }
            );

        }, [
            shipments,
            search,
            activeFilter
        ]);


    if (loading) {

        return (
            <main className="shipments-loading">
                Loading shipments...
            </main>
        );

    }


    if (error || !user) {
        return null;
    }


    return (

        <main className="dashboard-shell">

            <DashboardSidebar
                user={user}
            />


            <section className="dashboard-content shipments-page">

                {/* =========================================
                    HEADER
                ========================================= */}

                <header className="shipments-header">

                    <div>

                        <p className="dashboard-kicker">
                            OPERATIONS
                        </p>

                        <h1>
                            Shipments
                        </h1>

                        <p className="shipments-subtitle">
                            Monitor active cargo movement
                            across the NER network.
                        </p>

                    </div>


                    <div className="shipment-count">

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            {shipments.length}
                        </strong>

                    </div>

                </header>


                {/* =========================================
                    TOOLBAR
                ========================================= */}

                <section className="shipments-toolbar">

                    <div className="shipment-search">

                        <span>
                            /
                        </span>

                        <input
                            type="search"
                            value={search}
                            onChange={(
                                event
                            ) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search tracking ID, route or vehicle..."
                        />

                    </div>


                    <div className="shipment-filters">

                        {FILTERS.map(
                            (filter) => (

                                <button
                                    key={filter}
                                    type="button"

                                    className={
                                        activeFilter ===
                                        filter
                                            ? "shipment-filter active"
                                            : "shipment-filter"
                                    }

                                    onClick={() =>
                                        setActiveFilter(
                                            filter
                                        )
                                    }
                                >
                                    {filter
                                        .replace(
                                            "_",
                                            " "
                                        )}
                                </button>

                            )
                        )}

                    </div>

                </section>


                {/* =========================================
                    SHIPMENT LIST
                ========================================= */}

                <section className="shipments-panel">

                    <div className="shipments-table-head">

                        <span>
                            TRACKING
                        </span>

                        <span>
                            ROUTE
                        </span>

                        <span>
                            VEHICLE
                        </span>

                        <span>
                            DRIVER
                        </span>

                        <span>
                            STATUS
                        </span>

                    </div>


                    {filteredShipments.length === 0 ? (

                        <div className="shipments-empty">

                            <strong>
                                No shipments found
                            </strong>

                            <span>
                                Try changing your
                                search or filter.
                            </span>

                        </div>

                    ) : (

                        <div className="shipments-list">

                            {filteredShipments.map(
                                (shipment) => (

                                    <button
                                        key={
                                            shipment._id
                                        }

                                        type="button"

                                        className="shipment-row"

                                        onClick={() =>
                                            navigate(
                                                `/shipments/${shipment._id}`
                                            )
                                        }
                                    >

                                        <div
                                            className="shipment-tracking"
                                        >

                                            <strong>
                                                {
                                                    shipment.trackingId
                                                }
                                            </strong>

                                            <span>
                                                {
                                                    shipment.cargoType ||
                                                    "Cargo"
                                                }
                                            </span>

                                        </div>


                                        <div
                                            className="shipment-route"
                                        >

                                            <span>
                                                {
                                                    shipment
                                                        .origin
                                                        ?.name ||
                                                    "Unknown"
                                                }
                                            </span>

                                            <span className="route-arrow">
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


                                        <div
                                            className="shipment-vehicle"
                                        >

                                            <strong>
                                                {
                                                    shipment
                                                        .vehicle
                                                        ?.registrationNumber ||
                                                    "—"
                                                }
                                            </strong>

                                            <span>
                                                {
                                                    shipment
                                                        .vehicle
                                                        ?.type ||
                                                    "—"
                                                }
                                            </span>

                                        </div>


                                        <div
                                            className="shipment-driver"
                                        >

                                            <strong>
                                                {
                                                    shipment
                                                        .driver
                                                        ?.name ||
                                                    "Unassigned"
                                                }
                                            </strong>

                                            <span>
                                                Driver
                                            </span>

                                        </div>


                                        <div
                                            className="shipment-status"
                                        >

                                            <span
                                                className={
                                                    `status-badge status-${shipment.status?.toLowerCase()}`
                                                }
                                            >
                                                {
                                                    shipment.status ||
                                                    "UNKNOWN"
                                                }
                                            </span>

                                            <span className="row-arrow">
                                                ↗
                                            </span>

                                        </div>

                                    </button>

                                )
                            )}

                        </div>

                    )}

                </section>

            </section>

        </main>
    );
};


export default Shipments;