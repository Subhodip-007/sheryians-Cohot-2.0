import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getMe
} from "../../api/auth.api";

import {
    getIncidents
} from "../../api/incident.api";

import DashboardSidebar
    from "../../components/dashboard/DashboardSidebar";

import "./incidents.scss";


const SEVERITY_FILTERS = [
    "ALL",
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW"
];


const STATUS_FILTERS = [
    "ALL",
    "REPORTED",
    "VERIFIED",
    "RESOLVED"
];


const Incidents = () => {

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
       INCIDENTS
    ===================================================== */

    const [
        incidents,
        setIncidents
    ] = useState([]);


    /* =====================================================
       SEARCH
    ===================================================== */

    const [
        search,
        setSearch
    ] = useState("");


    /* =====================================================
       FILTERS
    ===================================================== */

    const [
        severityFilter,
        setSeverityFilter
    ] = useState("ALL");


    const [
        statusFilter,
        setStatusFilter
    ] = useState("ALL");


    /* =====================================================
       PAGE STATE
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
                        getIncidents()
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


                    setUser(
                        userResult.user
                    );


                    /* -----------------------------------------
                       INCIDENTS
                    ----------------------------------------- */

                    if (
                        !incidentResult?.success
                    ) {

                        throw new Error(
                            incidentResult?.message ||
                            "Unable to fetch incidents"
                        );

                    }


                    setIncidents(
                        incidentResult.incidents ||
                        []
                    );

                } catch (error) {

                    console.error(
                        "Incidents page error:",
                        error
                    );


                    setError(
                        error.message ||
                        "Unable to load incidents"
                    );


                    if (
                        error.message
                            ?.toLowerCase()
                            .includes("auth")
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

    }, [navigate]);


    /* =====================================================
       FILTERED INCIDENTS
    ===================================================== */

    const filteredIncidents =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            return incidents.filter(
                incident => {

                    const matchesSearch =
                        !query ||
                        incident.type
                            ?.toLowerCase()
                            .includes(query) ||
                        incident.description
                            ?.toLowerCase()
                            .includes(query) ||
                        incident.status
                            ?.toLowerCase()
                            .includes(query) ||
                        incident.reportedBy?.name
                            ?.toLowerCase()
                            .includes(query);


                    const matchesSeverity =
                        severityFilter ===
                            "ALL" ||
                        incident.severity ===
                            severityFilter;


                    const matchesStatus =
                        statusFilter ===
                            "ALL" ||
                        incident.status ===
                            statusFilter;


                    return (
                        matchesSearch &&
                        matchesSeverity &&
                        matchesStatus
                    );

                }
            );

        }, [
            incidents,
            search,
            severityFilter,
            statusFilter
        ]);


    /* =====================================================
       COUNTS
    ===================================================== */

    const criticalCount =
        incidents.filter(
            incident =>
                incident.severity ===
                "CRITICAL"
        ).length;


    const reportedCount =
        incidents.filter(
            incident =>
                incident.status ===
                "REPORTED"
        ).length;


    const resolvedCount =
        incidents.filter(
            incident =>
                incident.status ===
                "RESOLVED"
        ).length;


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <main
                className="
                    incidents-loading
                "
            >
                Loading incidents...
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
                    incidents-loading
                "
            >

                <div>

                    <p>
                        {error ||
                            "Unable to load incidents"}
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

            <DashboardSidebar
                user={user}
            />


            <section
                className="
                    dashboard-content
                    incidents-page
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <header
                    className="
                        incidents-header
                    "
                >

                    <div>

                        <p
                            className="
                                dashboard-kicker
                            "
                        >
                            INCIDENT MANAGEMENT
                        </p>


                        <h1>
                            Incidents
                        </h1>


                        <p
                            className="
                                incidents-subtitle
                            "
                        >
                            Monitor reported events
                            affecting the NER transport
                            network.
                        </p>

                    </div>


                    <div
                        className="
                            incident-summary
                        "
                    >

                        <div>

                            <span>
                                TOTAL
                            </span>

                            <strong>
                                {incidents.length}
                            </strong>

                        </div>


                        <div>

                            <span>
                                CRITICAL
                            </span>

                            <strong>
                                {criticalCount}
                            </strong>

                        </div>


                        <div>

                            <span>
                                REPORTED
                            </span>

                            <strong>
                                {reportedCount}
                            </strong>

                        </div>


                        <div>

                            <span>
                                RESOLVED
                            </span>

                            <strong>
                                {resolvedCount}
                            </strong>

                        </div>

                    </div>

                </header>


                {/* =================================================
                    SEARCH
                ================================================= */}

                <section
                    className="
                        incidents-toolbar
                    "
                >

                    <div
                        className="
                            incident-search
                        "
                    >

                        <span>
                            /
                        </span>


                        <input
                            type="search"
                            value={search}
                            onChange={event =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="
                                Search incident,
                                description or reporter...
                            "
                        />

                    </div>


                    {/* =============================================
                        SEVERITY FILTERS
                    ============================================= */}

                    <div
                        className="
                            incident-filters
                        "
                    >

                        {SEVERITY_FILTERS.map(
                            filter => (

                                <button
                                    key={filter}
                                    type="button"

                                    className={
                                        severityFilter ===
                                        filter
                                            ? "incident-filter active"
                                            : "incident-filter"
                                    }

                                    onClick={() =>
                                        setSeverityFilter(
                                            filter
                                        )
                                    }
                                >
                                    {filter}
                                </button>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    STATUS FILTERS
                ================================================= */}

                <section
                    className="
                        incident-status-filters
                    "
                >

                    <span>
                        STATUS
                    </span>


                    {STATUS_FILTERS.map(
                        filter => (

                            <button
                                key={filter}
                                type="button"

                                className={
                                    statusFilter ===
                                    filter
                                        ? "status-filter active"
                                        : "status-filter"
                                }

                                onClick={() =>
                                    setStatusFilter(
                                        filter
                                    )
                                }
                            >
                                {filter}
                            </button>

                        )
                    )}

                </section>


                {/* =================================================
                    INCIDENT LIST
                ================================================= */}

                <section
                    className="
                        incidents-panel
                    "
                >

                    {/* TABLE HEAD */}

                    <div
                        className="
                            incidents-table-head
                        "
                    >

                        <span>
                            INCIDENT
                        </span>

                        <span>
                            SEVERITY
                        </span>

                        <span>
                            LOCATION
                        </span>

                        <span>
                            REPORTED BY
                        </span>

                        <span>
                            STATUS
                        </span>

                    </div>


                    {/* EMPTY */}

                    {filteredIncidents.length === 0 ? (

                        <div
                            className="
                                incidents-empty
                            "
                        >

                            <strong>
                                No incidents found
                            </strong>


                            <span>
                                Try changing your
                                search or filters.
                            </span>

                        </div>

                    ) : (

                        <div
                            className="
                                incidents-list
                            "
                        >

                            {filteredIncidents.map(
                                incident => (

                                    <button
                                        key={
                                            incident._id
                                        }

                                        type="button"

                                        className="
                                            incident-row
                                        "

                                        onClick={() =>
                                            navigate(
                                                `/incidents/${incident._id}`
                                            )
                                        }
                                    >

                                        {/* =================================
                                            INCIDENT
                                        ================================= */}

                                        <div
                                            className="
                                                incident-main
                                            "
                                        >

                                            <strong>
                                                {
                                                    incident.type ||
                                                    "UNKNOWN"
                                                }
                                            </strong>


                                            <span>
                                                {
                                                    incident.description ||
                                                    "No description"
                                                }
                                            </span>

                                        </div>


                                        {/* =================================
                                            SEVERITY
                                        ================================= */}

                                        <div>

                                            <span
                                                className={
                                                    `severity-badge severity-${incident.severity?.toLowerCase() || "unknown"}`
                                                }
                                            >

                                                {
                                                    incident.severity ||
                                                    "UNKNOWN"
                                                }

                                            </span>

                                        </div>


                                        {/* =================================
                                            LOCATION
                                        ================================= */}

                                        <div
                                            className="
                                                incident-location
                                            "
                                        >

                                            <strong>
                                                {
                                                    incident
                                                        .location
                                                        ?.coordinates?.[1]
                                                        ?.toFixed(4) ||
                                                    "—"
                                                }
                                            </strong>


                                            <span>

                                                {
                                                    incident
                                                        .location
                                                        ?.coordinates?.[0]
                                                        ?.toFixed(4) ||
                                                    "—"
                                                }

                                            </span>

                                        </div>


                                        {/* =================================
                                            REPORTED BY
                                        ================================= */}

                                        <div
                                            className="
                                                incident-reporter
                                            "
                                        >

                                            <strong>
                                                {
                                                    incident
                                                        .reportedBy
                                                        ?.name ||
                                                    "Unknown"
                                                }
                                            </strong>


                                            <span>
                                                {
                                                    incident
                                                        .reportedBy
                                                        ?.role ||
                                                    "—"
                                                }
                                            </span>

                                        </div>


                                        {/* =================================
                                            STATUS
                                        ================================= */}

                                        <div
                                            className="
                                                incident-status
                                            "
                                        >

                                            <span
                                                className={
                                                    `incident-status-badge status-${incident.status?.toLowerCase() || "unknown"}`
                                                }
                                            >

                                                {
                                                    incident.status ||
                                                    "UNKNOWN"
                                                }

                                            </span>


                                            <span
                                                className="
                                                    incident-arrow
                                                "
                                            >
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


export default Incidents;