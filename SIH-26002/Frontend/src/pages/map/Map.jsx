import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    MapContainer,
    Marker,
    Polyline,
    Popup,
    TileLayer,
    useMap
} from "react-leaflet";

import socket from "../../socket";

import L from "leaflet";

import {
    getMe
} from "../../api/auth.api";

import {
    getShipments
} from "../../api/shipment.api";

import {
    getVehicles
} from "../../api/vehicle.api";

import {
    getIncidents
} from "../../api/incident.api";

import {
    getRoutes
} from "../../api/route.api";

import DashboardSidebar
    from "../../components/dashboard/DashboardSidebar";

import "./map.scss";


/* =========================================================
   LEAFLET DEFAULT ICON
========================================================= */

const defaultIcon = new L.Icon({

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [
        25,
        41
    ],

    iconAnchor: [
        12,
        41
    ],

    popupAnchor: [
        1,
        -34
    ],

    shadowSize: [
        41,
        41
    ]

});


L.Marker.prototype.options.icon =
    defaultIcon;


/* =========================================================
   FIT ROUTE
========================================================= */

const FitRoute = ({
    points
}) => {

    const map =
        useMap();


    useEffect(() => {

        if (
            !points ||
            points.length < 2
        ) {

            return;

        }


        const bounds =
            L.latLngBounds(
                points
            );


        map.fitBounds(
            bounds,
            {
                padding: [
                    50,
                    50
                ]
            }
        );

    }, [
        map,
        points
    ]);


    return null;
};


/* =========================================================
   MAP PAGE
========================================================= */

const Map = () => {

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
       DATA
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


    const [
        routes,
        setRoutes
    ] = useState([]);


    /* =====================================================
       SELECTED SHIPMENT
    ===================================================== */

    const [
        selectedShipment,
        setSelectedShipment
    ] = useState(null);


    /* =====================================================
       LIVE VEHICLE LOCATIONS

       {
           vehicleId: {
               coordinates: [lng, lat],
               currentSegment: "...",
               updatedAt: timestamp
           }
       }
    ===================================================== */

    const [
        liveVehicleLocations,
        setLiveVehicleLocations
    ] = useState({});


    /* =====================================================
       SOCKET CONNECTION STATE
    ===================================================== */

    const [
        socketConnected,
        setSocketConnected
    ] = useState(
        socket.connected
    );


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
       LOAD MAP DATA
    ===================================================== */

    useEffect(() => {

        let mounted = true;


        const loadMapData =
            async () => {

                try {

                    const [
                        userResult,
                        shipmentResult,
                        vehicleResult,
                        incidentResult,
                        routeResult
                    ] = await Promise.all([
                        getMe(),
                        getShipments(),
                        getVehicles(),
                        getIncidents(),
                        getRoutes()
                    ]);


                    /* -----------------------------------------
                       AUTH
                    ----------------------------------------- */

                    if (
                        !userResult?.success
                    ) {

                        throw new Error(
                            userResult?.message ||
                            "Authentication failed"
                        );

                    }


                    if (!mounted) {
                        return;
                    }


                    setUser(
                        userResult.user
                    );


                    /* -----------------------------------------
                       SHIPMENTS
                    ----------------------------------------- */

                    const shipmentList =
                        shipmentResult?.shipments ||
                        [];


                    setShipments(
                        shipmentList
                    );


                    /* -----------------------------------------
                       VEHICLES
                    ----------------------------------------- */

                    setVehicles(
                        vehicleResult?.vehicles ||
                        []
                    );


                    /* -----------------------------------------
                       INCIDENTS
                    ----------------------------------------- */

                    setIncidents(
                        incidentResult?.incidents ||
                        []
                    );


                    /* -----------------------------------------
                       ROUTES
                    ----------------------------------------- */

                    const routeList =
                        routeResult?.routes ||
                        [];


                    setRoutes(
                        routeList
                    );


                    /* -----------------------------------------
                       DEFAULT SHIPMENT
                    ----------------------------------------- */

                    if (
                        shipmentList.length > 0
                    ) {

                        setSelectedShipment(
                            shipmentList[0]
                        );

                    } else {

                        setSelectedShipment(
                            null
                        );

                    }

                } catch (error) {

                    console.error(
                        "Map page error:",
                        error
                    );


                    if (!mounted) {
                        return;
                    }


                    setError(
                        error.message ||
                        "Unable to load map"
                    );


                    if (
                        error.message
                            ?.toLowerCase()
                            .includes(
                                "auth"
                            )
                    ) {

                        navigate(
                            "/login",
                            {
                                replace: true
                            }
                        );

                    }

                } finally {

                    if (mounted) {

                        setLoading(
                            false
                        );

                    }

                }

            };


        loadMapData();


        return () => {

            mounted = false;

        };

    }, [
        navigate
    ]);


    /* =====================================================
       SOCKET CONNECTION
    ===================================================== */

    useEffect(() => {

        const handleConnect =
            () => {

                console.log(
                    "Socket connected:",
                    socket.id
                );

                setSocketConnected(
                    true
                );

            };


        const handleDisconnect =
            () => {

                console.log(
                    "Socket disconnected"
                );

                setSocketConnected(
                    false
                );

            };


        socket.on(
            "connect",
            handleConnect
        );


        socket.on(
            "disconnect",
            handleDisconnect
        );


        if (
            !socket.connected
        ) {

            socket.connect();

        }


        return () => {

            socket.off(
                "connect",
                handleConnect
            );

            socket.off(
                "disconnect",
                handleDisconnect
            );

        };

    }, []);


    /* =====================================================
       JOIN SELECTED SHIPMENT ROOM
    ===================================================== */

    useEffect(() => {

        if (
            !selectedShipment?._id
        ) {

            return;

        }


        const shipmentId =
            selectedShipment._id;


        /*
         * Make sure socket is connected.
         */

        if (
            !socket.connected
        ) {

            socket.connect();

        }


        /*
         * Join the backend room:
         *
         * shipment:{shipmentId}
         */

        socket.emit(
            "join-shipment",
            shipmentId
        );


        console.log(
            "Joined shipment room:",
            shipmentId
        );


        /* ==============================================
           LOCATION UPDATE
        ============================================== */

        const handleVehicleLocation =
            (data) => {

                console.log(
                    "Vehicle location update:",
                    data
                );


                if (
                    !data?.vehicleId
                ) {

                    return;

                }


                if (
                    !Array.isArray(
                        data.coordinates
                    ) ||
                    data.coordinates.length !== 2
                ) {

                    return;

                }


                const vehicleId =
                    String(
                        data.vehicleId
                    );


                setLiveVehicleLocations(
                    previous => ({

                        ...previous,

                        [vehicleId]: {

                            coordinates:
                                data.coordinates,

                            currentSegment:
                                data.currentSegment ||
                                null,

                            updatedAt:
                                Date.now()

                        }

                    })
                );


                /*
                 * Also update the selected shipment's
                 * current location locally.
                 */

                setShipments(
                    previous =>
                        previous.map(
                            shipment => {

                                const shipmentVehicleId =
                                    typeof shipment.vehicle ===
                                    "string"

                                        ? shipment.vehicle

                                        : shipment
                                            ?.vehicle
                                            ?._id;


                                if (
                                    String(
                                        shipment._id
                                    ) !==
                                    String(
                                        shipmentId
                                    )
                                ) {

                                    return shipment;

                                }


                                return {

                                    ...shipment,

                                    currentLocation: {

                                        type:
                                            "Point",

                                        coordinates:
                                            data.coordinates

                                    },

                                    currentSegment:
                                        data.currentSegment ||
                                        shipment.currentSegment ||
                                        null

                                };

                            }
                        )
                );


                /*
                 * Keep selectedShipment synchronized.
                 */

                setSelectedShipment(
                    previous => {

                        if (
                            !previous ||
                            String(
                                previous._id
                            ) !==
                            String(
                                shipmentId
                            )
                        ) {

                            return previous;

                        }


                        return {

                            ...previous,

                            currentLocation: {

                                type:
                                    "Point",

                                coordinates:
                                    data.coordinates

                            },

                            currentSegment:
                                data.currentSegment ||
                                previous.currentSegment ||
                                null

                        };

                    }
                );

            };


        socket.on(
            "vehicle-location-updated",
            handleVehicleLocation
        );


        return () => {

            socket.off(
                "vehicle-location-updated",
                handleVehicleLocation
            );

        };

    }, [
        selectedShipment?._id
    ]);


    /* =====================================================
       CURRENT ROUTE

       Shipment.route is authoritative.
       No routes[0] fallback.
    ===================================================== */

    const currentRoute =
        useMemo(() => {

            if (
                !selectedShipment
            ) {

                return null;

            }


            const shipmentRouteId =
                typeof selectedShipment.route ===
                "string"

                    ? selectedShipment.route

                    : selectedShipment
                        ?.route
                        ?._id;


            if (
                !shipmentRouteId
            ) {

                return null;

            }


            return (
                routes.find(
                    route =>
                        String(
                            route?._id
                        ) ===
                        String(
                            shipmentRouteId
                        )
                ) ||
                null
            );

        }, [
            routes,
            selectedShipment
        ]);


    /* =====================================================
       ROUTE GEOMETRY
    ===================================================== */

    const routePoints =
        useMemo(() => {

            const coordinates =
                currentRoute
                    ?.geometry
                    ?.coordinates;


            if (
                !Array.isArray(
                    coordinates
                ) ||
                coordinates.length < 2
            ) {

                return [];

            }


            return coordinates

                .filter(
                    coordinate => {

                        if (
                            !Array.isArray(
                                coordinate
                            )
                        ) {

                            return false;

                        }


                        if (
                            coordinate.length <
                            2
                        ) {

                            return false;

                        }


                        const [
                            longitude,
                            latitude
                        ] = coordinate;


                        return (
                            Number.isFinite(
                                longitude
                            ) &&
                            Number.isFinite(
                                latitude
                            )
                        );

                    }
                )

                .map(
                    ([
                        longitude,
                        latitude
                    ]) => [

                        latitude,
                        longitude

                    ]
                );

        }, [
            currentRoute
        ]);


    /* =====================================================
       INCIDENT POINTS
    ===================================================== */

    const incidentPoints =
        incidents.filter(
            incident => {

                const coordinates =
                    incident
                        ?.location
                        ?.coordinates;


                return (
                    Array.isArray(
                        coordinates
                    ) &&
                    coordinates.length >= 2 &&
                    Number.isFinite(
                        coordinates[0]
                    ) &&
                    Number.isFinite(
                        coordinates[1]
                    )
                );

            }
        );


    /* =====================================================
       LIVE VEHICLE POINTS

       Merge REST vehicle state with Socket.IO state.
    ===================================================== */

    const vehiclePoints =
        useMemo(() => {

            return vehicles

                .map(
                    vehicle => {

                        const vehicleId =
                            String(
                                vehicle._id
                            );


                        const live =
                            liveVehicleLocations[
                                vehicleId
                            ];


                        if (
                            !live
                        ) {

                            return vehicle;

                        }


                        return {

                            ...vehicle,

                            currentLocation: {

                                type:
                                    "Point",

                                coordinates:
                                    live.coordinates

                            },

                            currentSegment:
                                live.currentSegment ||
                                vehicle.currentSegment ||
                                null

                        };

                    }
                )

                .filter(
                    vehicle => {

                        const coordinates =
                            vehicle
                                ?.currentLocation
                                ?.coordinates;


                        if (
                            !Array.isArray(
                                coordinates
                            ) ||
                            coordinates.length < 2
                        ) {

                            return false;

                        }


                        const [
                            longitude,
                            latitude
                        ] = coordinates;


                        /*
                         * [0, 0] is your placeholder.
                         */

                        if (
                            longitude === 0 &&
                            latitude === 0
                        ) {

                            return false;

                        }


                        return (
                            Number.isFinite(
                                longitude
                            ) &&
                            Number.isFinite(
                                latitude
                            )
                        );

                    }
                );

        }, [
            vehicles,
            liveVehicleLocations
        ]);


    /* =====================================================
       SELECTED VEHICLE
    ===================================================== */

    const selectedVehicle =
        useMemo(() => {

            const vehicleId =
                typeof selectedShipment?.vehicle ===
                "string"

                    ? selectedShipment.vehicle

                    : selectedShipment
                        ?.vehicle
                        ?._id;


            if (
                !vehicleId
            ) {

                return null;

            }


            return (
                vehiclePoints.find(
                    vehicle =>
                        String(
                            vehicle._id
                        ) ===
                        String(
                            vehicleId
                        )
                ) ||
                null
            );

        }, [
            selectedShipment,
            vehiclePoints
        ]);


    /* =====================================================
       LIVE LOCATION
    ===================================================== */

    const selectedVehicleCoordinates =
        selectedVehicle
            ?.currentLocation
            ?.coordinates || null;


    const selectedVehicleIsLive =
        selectedVehicleCoordinates &&
        liveVehicleLocations[
            String(
                selectedVehicle?._id
            )
        ];


    /* =====================================================
       MAP STATE
    ===================================================== */

    const hasRoute =
        Boolean(
            currentRoute
        );


    const hasRouteGeometry =
        routePoints.length > 1;


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <main
                className="
                    map-loading
                "
            >

                <div>
                    Loading network map...
                </div>

            </main>

        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (
        error ||
        !user
    ) {

        return (

            <main
                className="
                    map-loading
                "
            >

                <div>

                    <p>
                        {
                            error ||
                            "Unable to load map"
                        }
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                    >
                        ← Back to dashboard
                    </button>

                </div>

            </main>

        );

    }


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <main
            className="
                dashboard-shell
            "
        >

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <DashboardSidebar
                user={user}
            />


            {/* =================================================
                CONTENT
            ================================================= */}

            <section
                className="
                    dashboard-content
                    map-page
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <header
                    className="
                        map-header
                    "
                >

                    <div>

                        <p
                            className="
                                dashboard-kicker
                            "
                        >
                            LIVE NETWORK
                        </p>


                        <h1>
                            Map & Routes
                        </h1>


                        <p
                            className="
                                map-subtitle
                            "
                        >
                            Monitor shipments,
                            vehicles and incidents
                            across the active corridor.
                        </p>

                    </div>


                    <div
                        className="
                            map-status
                        "
                    >

                        <span
                            className="
                                map-status-dot
                            "
                        />

                        {socketConnected
                            ? "LIVE"
                            : "OFFLINE"}

                    </div>

                </header>


                {/* =================================================
                    MAP LAYOUT
                ================================================= */}

                <section
                    className="
                        map-layout
                    "
                >

                    {/* =================================================
                        MAP
                    ================================================= */}

                    <div
                        className="
                            map-container
                        "
                    >

                        <MapContainer

                            center={[
                                25.48,
                                92.8
                            ]}

                            zoom={7}

                            scrollWheelZoom={
                                true
                            }

                            className="
                                network-map
                            "
                        >

                            {/* =========================================
                                TILE LAYER
                            ========================================= */}

                            <TileLayer

                                attribution="
                                    &copy; OpenStreetMap contributors
                                "

                                url="
                                    https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
                                "

                            />


                            {/* =========================================
                                ROAD ROUTE
                            ========================================= */}

                            {hasRouteGeometry && (

                                <>

                                    <Polyline

                                        positions={
                                            routePoints
                                        }

                                        pathOptions={{
                                            color:
                                                "#111111",

                                            weight:
                                                5,

                                            opacity:
                                                0.85
                                        }}

                                    />


                                    {/* =================================
                                        ORIGIN
                                    ================================= */}

                                    <Marker
                                        position={
                                            routePoints[0]
                                        }
                                    >

                                        <Popup>

                                            <strong>
                                                Origin
                                            </strong>


                                            <br />


                                            {
                                                selectedShipment
                                                    ?.origin
                                                    ?.name ||

                                                currentRoute
                                                    ?.origin
                                                    ?.name ||

                                                "Origin"
                                            }

                                        </Popup>

                                    </Marker>


                                    {/* =================================
                                        DESTINATION
                                    ================================= */}

                                    <Marker
                                        position={
                                            routePoints[
                                                routePoints.length - 1
                                            ]
                                        }
                                    >

                                        <Popup>

                                            <strong>
                                                Destination
                                            </strong>


                                            <br />


                                            {
                                                selectedShipment
                                                    ?.destination
                                                    ?.name ||

                                                currentRoute
                                                    ?.destination
                                                    ?.name ||

                                                "Destination"
                                            }

                                        </Popup>

                                    </Marker>


                                    <FitRoute
                                        points={
                                            routePoints
                                        }
                                    />

                                </>

                            )}


                            {/* =========================================
                                VEHICLES
                            ========================================= */}

                            {vehiclePoints.map(
                                vehicle => {

                                    const [
                                        longitude,
                                        latitude
                                    ] =
                                        vehicle
                                            .currentLocation
                                            .coordinates;


                                    const live =
                                        liveVehicleLocations[
                                            String(
                                                vehicle._id
                                            )
                                        ];


                                    return (

                                        <Marker

                                            key={
                                                vehicle._id
                                            }

                                            position={[
                                                latitude,
                                                longitude
                                            ]}
                                        >

                                            <Popup>

                                                <strong>
                                                    {
                                                        vehicle
                                                            .registrationNumber ||
                                                        "Vehicle"
                                                    }
                                                </strong>


                                                <br />


                                                {
                                                    vehicle
                                                        .type ||
                                                    "TRUCK"
                                                }


                                                <br />


                                                Status:{" "}

                                                {
                                                    vehicle
                                                        .status ||
                                                    "UNKNOWN"
                                                }


                                                <br />


                                                Location:{" "}

                                                {live
                                                    ? "LIVE"
                                                    : "REST"}
 
                                            </Popup>

                                        </Marker>

                                    );

                                }
                            )}


                            {/* =========================================
                                SELECTED VEHICLE
                                
                                Extra popup marker is intentionally
                                NOT rendered here because the vehicle
                                marker above already represents it.
                            ========================================= */}


                            {/* =========================================
                                INCIDENTS
                            ========================================= */}

                            {incidentPoints.map(
                                incident => {

                                    const [
                                        longitude,
                                        latitude
                                    ] =
                                        incident
                                            .location
                                            .coordinates;


                                    return (

                                        <Marker

                                            key={
                                                incident._id
                                            }

                                            position={[
                                                latitude,
                                                longitude
                                            ]}
                                        >

                                            <Popup>

                                                <strong>
                                                    {
                                                        incident.type ||
                                                        "INCIDENT"
                                                    }
                                                </strong>


                                                <br />


                                                Severity:{" "}

                                                {
                                                    incident.severity ||
                                                    "UNKNOWN"
                                                }


                                                <br />


                                                {
                                                    incident.description ||
                                                    "No description"
                                                }

                                            </Popup>

                                        </Marker>

                                    );

                                }
                            )}

                        </MapContainer>


                        {/* =================================================
                            ROUTE STATUS
                        ================================================= */}

                        <div
                            className="
                                map-routing-status
                            "
                        >

                            {!hasRoute ? (

                                "NO ROUTE SELECTED"

                            ) : !hasRouteGeometry ? (

                                "ROUTE GEOMETRY UNAVAILABLE"

                            ) : (

                                <>
                                    ROUTE ACTIVE ·{" "}
                                    {
                                        currentRoute.name
                                    }
                                </>

                            )}

                        </div>


                        {/* =================================================
                            LEGEND
                        ================================================= */}

                        <div
                            className="
                                map-legend
                            "
                        >

                            <div>

                                <span
                                    className="
                                        legend-route
                                    "
                                />

                                Route

                            </div>


                            <div>

                                <span
                                    className="
                                        legend-vehicle
                                    "
                                />

                                Vehicle

                            </div>


                            <div>

                                <span
                                    className="
                                        legend-incident
                                    "
                                />

                                Incident

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SIDE PANEL
                    ================================================= */}

                    <aside
                        className="
                            map-side-panel
                        "
                    >

                        {/* =============================================
                            SHIPMENTS
                        ============================================= */}

                        <div
                            className="
                                map-panel-section
                            "
                        >

                            <div
                                className="
                                    map-panel-heading
                                "
                            >

                                <span>
                                    SHIPMENTS
                                </span>


                                <strong>
                                    {
                                        shipments.length
                                    }
                                </strong>

                            </div>


                            <div
                                className="
                                    map-shipment-list
                                "
                            >

                                {shipments.length === 0 ? (

                                    <p
                                        className="
                                            map-empty
                                        "
                                    >
                                        No shipments available.
                                    </p>

                                ) : (

                                    shipments.map(
                                        shipment => (

                                            <button

                                                key={
                                                    shipment._id
                                                }

                                                type="button"

                                                className={
                                                    selectedShipment?._id ===
                                                    shipment._id

                                                        ? "map-shipment active"

                                                        : "map-shipment"
                                                }

                                                onClick={() =>
                                                    setSelectedShipment(
                                                        shipment
                                                    )
                                                }
                                            >

                                                <div>

                                                    <strong>
                                                        {
                                                            shipment
                                                                .trackingId
                                                        }
                                                    </strong>


                                                    <span>

                                                        {
                                                            shipment
                                                                .origin
                                                                ?.name ||
                                                            "Unknown"
                                                        }

                                                        {" → "}

                                                        {
                                                            shipment
                                                                .destination
                                                                ?.name ||
                                                            "Unknown"
                                                        }

                                                    </span>

                                                </div>


                                                <span>
                                                    {
                                                        shipment
                                                            .status ||
                                                        "UNKNOWN"
                                                    }
                                                </span>

                                            </button>

                                        )
                                    )

                                )}

                            </div>

                        </div>


                        {/* =============================================
                            SELECTED ROUTE
                        ============================================= */}

                        {selectedShipment && (

                            <div
                                className="
                                    map-panel-section
                                    selected-route-panel
                                "
                            >

                                <span>
                                    SELECTED ROUTE
                                </span>


                                <h2>
                                    {
                                        currentRoute?.name ||
                                        "No route selected"
                                    }
                                </h2>


                                <p
                                    className="
                                        map-route-subtitle
                                    "
                                >
                                    {
                                        selectedShipment
                                            ?.trackingId ||
                                        "No shipment"
                                    }
                                </p>


                                <div
                                    className="
                                        route-metrics
                                    "
                                >

                                    <div>

                                        <span>
                                            DISTANCE
                                        </span>


                                        <strong>

                                            {
                                                currentRoute
                                                    ?.distance ??
                                                "—"
                                            }

                                            {" km"}

                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            ETA
                                        </span>


                                        <strong>

                                            {
                                                currentRoute
                                                    ?.estimatedTime ??
                                                "—"
                                            }

                                            {" min"}

                                        </strong>

                                    </div>

                                </div>


                                {/* =====================================
                                    LIVE TRACKING
                                ===================================== */}

                                <div
                                    className="
                                        map-live-tracking
                                    "
                                >

                                    <div>

                                        <span>
                                            LIVE TRACKING
                                        </span>


                                        <strong>
                                            {
                                                socketConnected &&
                                                selectedVehicleIsLive
                                                    ? "CONNECTED"
                                                    : socketConnected
                                                        ? "WAITING"
                                                        : "OFFLINE"
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            CURRENT SEGMENT
                                        </span>


                                        <strong>
                                            {
                                                selectedShipment
                                                    ?.currentSegment
                                                    ?.name ||
                                                selectedVehicle
                                                    ?.currentSegment
                                                    ?.name ||
                                                "—"
                                            }
                                        </strong>

                                    </div>

                                </div>


                                <div
                                    className="
                                        route-state
                                    "
                                >

                                    <span>
                                        ROUTE STATUS
                                    </span>


                                    <strong>
                                        {
                                            currentRoute
                                                ?.status ||
                                            "UNKNOWN"
                                        }
                                    </strong>

                                </div>


                                <button

                                    type="button"

                                    className="
                                        map-details-button
                                    "

                                    onClick={() =>
                                        navigate(
                                            `/shipments/${selectedShipment._id}`
                                        )
                                    }
                                >

                                    Open shipment

                                    <span>
                                        ↗
                                    </span>

                                </button>

                            </div>

                        )}


                        {/* =============================================
                            INCIDENTS
                        ============================================= */}

                        <div
                            className="
                                map-panel-section
                            "
                        >

                            <div
                                className="
                                    map-panel-heading
                                "
                            >

                                <span>
                                    INCIDENTS
                                </span>


                                <strong>
                                    {
                                        incidents.length
                                    }
                                </strong>

                            </div>


                            {incidents.length > 0 ? (

                                incidents
                                    .slice(
                                        0,
                                        3
                                    )
                                    .map(
                                        incident => (

                                            <div

                                                key={
                                                    incident._id
                                                }

                                                className="
                                                    map-incident
                                                "
                                            >

                                                <div>

                                                    <strong>
                                                        {
                                                            incident
                                                                .type ||
                                                            "INCIDENT"
                                                        }
                                                    </strong>


                                                    <span>
                                                        {
                                                            incident
                                                                .description ||
                                                            "No description"
                                                        }
                                                    </span>

                                                </div>


                                                <span>
                                                    {
                                                        incident
                                                            .severity ||
                                                        "UNKNOWN"
                                                    }
                                                </span>

                                            </div>

                                        )
                                    )

                            ) : (

                                <p
                                    className="
                                        map-empty
                                    "
                                >
                                    No active incidents.
                                </p>

                            )}

                        </div>


                        {/* =============================================
                            ROUTES
                        ============================================= */}

                        <div
                            className="
                                map-panel-section
                                map-route-info
                            "
                        >

                            <div
                                className="
                                    map-panel-heading
                                "
                            >

                                <span>
                                    ROUTES
                                </span>


                                <strong>
                                    {
                                        routes.length
                                    }
                                </strong>

                            </div>


                            <p>

                                {
                                    currentRoute
                                        ? `Showing ${currentRoute.name}`
                                        : "No shipment route selected."
                                }

                            </p>

                        </div>

                    </aside>

                </section>

            </section>

        </main>

    );

};


export default Map;