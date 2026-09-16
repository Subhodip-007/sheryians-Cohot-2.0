import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer
} from "react-leaflet";

import L from "leaflet";

import {
    getMe
} from "../../api/auth.api";

import {
    getIncidentById
} from "../../api/incident.api";

import DashboardSidebar
    from "../../components/dashboard/DashboardSidebar";

import "./incident-details.scss";


/* =========================================================
   LEAFLET ICON
========================================================= */

const incidentIcon = new L.DivIcon({

    className:
        "incident-map-marker",

    html: `
        <div class="incident-marker-dot">
            <span></span>
        </div>
    `,

    iconSize: [
        24,
        24
    ],

    iconAnchor: [
        12,
        12
    ]

});


/* =========================================================
   INCIDENT DETAILS
========================================================= */

const IncidentDetails = () => {

    const {
        id
    } = useParams();


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
       INCIDENT
    ===================================================== */

    const [
        incident,
        setIncident
    ] = useState(null);


    /* =====================================================
       STATE
    ===================================================== */

    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    /* =====================================================
       LOAD DATA
    ===================================================== */

    useEffect(() => {

        const loadPage =
            async () => {

                try {

                    const [
                        userResult,
                        incidentResult
                    ] = await Promise.all([
                        getMe(),
                        getIncidentById(id)
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


                    /* -----------------------------------------
                       INCIDENT
                    ----------------------------------------- */

                    if (
                        !incidentResult?.success
                    ) {

                        throw new Error(
                            incidentResult?.message ||
                            "Unable to fetch incident"
                        );

                    }


                    setUser(
                        userResult.user
                    );


                    setIncident(
                        incidentResult.incident
                    );

                } catch (error) {

                    console.error(
                        "Incident details error:",
                        error
                    );


                    setError(
                        error.message ||
                        "Unable to load incident"
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

                    setLoading(false);

                }

            };


        loadPage();

    }, [
        id,
        navigate
    ]);


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <main
                className="
                    incident-details-loading
                "
            >
                Loading incident...
            </main>

        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (
        error ||
        !incident ||
        !user
    ) {

        return (

            <main
                className="
                    incident-details-error
                "
            >

                <div>

                    <p>
                        {error ||
                            "Incident not found"}
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/incidents"
                            )
                        }
                    >
                        ← Back to incidents
                    </button>

                </div>

            </main>

        );

    }


    /* =====================================================
       LOCATION
    ===================================================== */

    const coordinates =
        incident
            ?.location
            ?.coordinates || [];


    const longitude =
        coordinates[0];


    const latitude =
        coordinates[1];


    const hasLocation =
        Number.isFinite(
            longitude
        ) &&
        Number.isFinite(
            latitude
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <main
            className="
                dashboard-shell
            "
        >

            <DashboardSidebar
                user={user}
            />


            <section
                className="
                    dashboard-content
                    incident-details-page
                "
            >

                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    className="
                        incident-back
                    "
                    onClick={() =>
                        navigate(
                            "/incidents"
                        )
                    }
                >
                    ← Incidents
                </button>


                {/* =================================================
                    HEADER
                ================================================= */}

                <header
                    className="
                        incident-details-header
                    "
                >

                    <div>

                        <p
                            className="
                                dashboard-kicker
                            "
                        >
                            INCIDENT DETAILS
                        </p>


                        <h1>
                            {
                                incident.type ||
                                "Incident"
                            }
                        </h1>


                        <p
                            className="
                                incident-details-description
                            "
                        >
                            {
                                incident.description ||
                                "No description available."
                            }
                        </p>

                    </div>


                    <div
                        className={
                            `incident-severity-large severity-${incident.severity?.toLowerCase() || "unknown"}`
                        }
                    >

                        {
                            incident.severity ||
                            "UNKNOWN"
                        }

                    </div>

                </header>


                {/* =================================================
                    INFORMATION CARDS
                ================================================= */}

                <section
                    className="
                        incident-overview-grid
                    "
                >

                    <article
                        className="
                            incident-detail-card
                        "
                    >

                        <span>
                            STATUS
                        </span>


                        <strong>
                            {
                                incident.status ||
                                "UNKNOWN"
                            }
                        </strong>


                        <small>
                            Current incident state
                        </small>

                    </article>


                    <article
                        className="
                            incident-detail-card
                        "
                    >

                        <span>
                            REPORTED BY
                        </span>


                        <strong>
                            {
                                incident
                                    .reportedBy
                                    ?.name ||
                                "Unknown"
                            }
                        </strong>


                        <small>
                            {
                                incident
                                    .reportedBy
                                    ?.role ||
                                "—"
                            }
                        </small>

                    </article>


                    <article
                        className="
                            incident-detail-card
                        "
                    >

                        <span>
                            INCIDENT TYPE
                        </span>


                        <strong>
                            {
                                incident.type ||
                                "—"
                            }
                        </strong>


                        <small>
                            Recorded event type
                        </small>

                    </article>


                    <article
                        className="
                            incident-detail-card
                        "
                    >

                        <span>
                            REPORTED
                        </span>


                        <strong>
                            {
                                incident.createdAt
                                    ? new Date(
                                        incident.createdAt
                                    ).toLocaleDateString()
                                    : "—"
                            }
                        </strong>


                        <small>
                            {
                                incident.createdAt
                                    ? new Date(
                                        incident.createdAt
                                    ).toLocaleTimeString()
                                    : "—"
                            }
                        </small>

                    </article>

                </section>


                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <section
                    className="
                        incident-details-main
                    "
                >

                    {/* =================================================
                        MAP
                    ================================================= */}

                    <div
                        className="
                            incident-details-panel
                            incident-map-panel
                        "
                    >

                        <div
                            className="
                                incident-panel-header
                            "
                        >

                            <div>

                                <span>
                                    LOCATION
                                </span>


                                <h2>
                                    Incident location
                                </h2>

                            </div>


                            {hasLocation && (

                                <span
                                    className="
                                        coordinates-label
                                    "
                                >
                                    {latitude.toFixed(4)},
                                    {" "}
                                    {longitude.toFixed(4)}
                                </span>

                            )}

                        </div>


                        {hasLocation ? (

                            <div
                                className="
                                    incident-map-wrapper
                                "
                            >

                                <MapContainer

                                    center={[
                                        latitude,
                                        longitude
                                    ]}

                                    zoom={11}

                                    scrollWheelZoom={
                                        true
                                    }

                                    className="
                                        incident-map
                                    "
                                >

                                    <TileLayer

                                        attribution=
                                            "&copy; OpenStreetMap contributors"

                                        url=
                                            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                    />


                                    <Marker
                                        position={[
                                            latitude,
                                            longitude
                                        ]}

                                        icon={
                                            incidentIcon
                                        }
                                    >

                                        <Popup>

                                            <strong>
                                                {
                                                    incident
                                                        .type ||
                                                    "Incident"
                                                }
                                            </strong>


                                            <br />


                                            {
                                                incident
                                                    .severity ||
                                                "UNKNOWN"
                                            }


                                            <br />


                                            {
                                                incident
                                                    .description ||
                                                "No description"
                                            }

                                        </Popup>

                                    </Marker>

                                </MapContainer>

                            </div>

                        ) : (

                            <div
                                className="
                                    incident-map-unavailable
                                "
                            >
                                Location coordinates
                                are unavailable.
                            </div>

                        )}

                    </div>


                    {/* =================================================
                        INCIDENT SUMMARY
                    ================================================= */}

                    <aside
                        className="
                            incident-details-panel
                            incident-summary-panel
                        "
                    >

                        <div
                            className="
                                incident-panel-header
                            "
                        >

                            <div>

                                <span>
                                    INCIDENT
                                </span>


                                <h2>
                                    Summary
                                </h2>

                            </div>

                        </div>


                        <div
                            className="
                                incident-summary-list
                            "
                        >

                            <div>

                                <span>
                                    Severity
                                </span>


                                <strong
                                    className={
                                        `summary-severity severity-${incident.severity?.toLowerCase() || "unknown"}`
                                    }
                                >
                                    {
                                        incident.severity ||
                                        "UNKNOWN"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Status
                                </span>


                                <strong>
                                    {
                                        incident.status ||
                                        "UNKNOWN"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Reporter
                                </span>


                                <strong>
                                    {
                                        incident
                                            .reportedBy
                                            ?.name ||
                                        "Unknown"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Reporter email
                                </span>


                                <strong>
                                    {
                                        incident
                                            .reportedBy
                                            ?.email ||
                                        "—"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Affected segment
                                </span>


                                <strong
                                    className="
                                        value-muted
                                    "
                                >

                                    {
                                        incident
                                            .affectedSegment ||
                                        "Not linked"
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Verification
                                </span>


                                <strong
                                    className="
                                        value-muted
                                    "
                                >

                                    {
                                        incident
                                            .verifiedBy ||
                                        "Not verified"
                                    }

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Resolved
                                </span>


                                <strong
                                    className="
                                        value-muted
                                    "
                                >

                                    {
                                        incident.resolvedAt
                                            ? new Date(
                                                incident.resolvedAt
                                            ).toLocaleString()
                                            : "Not resolved"
                                    }

                                </strong>

                            </div>

                        </div>

                    </aside>

                </section>


                {/* =================================================
                    INTELLIGENCE
                ================================================= */}

                <section
                    className="
                        incident-intelligence
                    "
                >

                    <div>

                        <span>
                            ROUTE INTELLIGENCE
                        </span>


                        <h2>
                            Risk & rerouting
                        </h2>


                        <p>
                            This incident is currently not
                            linked to an affected route
                            segment. Risk analysis and
                            rerouting recommendations will
                            appear here once the incident is
                            associated with a route segment.
                        </p>

                    </div>


                    <div
                        className="
                            intelligence-state
                        "
                    >

                        <span>
                            STATUS
                        </span>


                        <strong>
                            PENDING
                        </strong>

                    </div>

                </section>

            </section>

        </main>
    );
};


export default IncidentDetails;