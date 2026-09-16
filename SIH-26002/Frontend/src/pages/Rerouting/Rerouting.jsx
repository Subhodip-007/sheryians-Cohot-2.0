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
    getShipments
} from "../../api/shipment.api";

import {
    getRecommendations,
    generateRecommendation,
    approveRecommendation,
    rejectRecommendation
} from "../../api/recommendation.api";

import DashboardSidebar
    from "../../components/dashboard/DashboardSidebar";

import "./rerouting.scss";


const Rerouting = () => {

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
       SHIPMENTS
    ===================================================== */

    const [
        shipments,
        setShipments
    ] = useState([]);


    const [
        selectedShipment,
        setSelectedShipment
    ] = useState(null);


    /* =====================================================
       RECOMMENDATION
    ===================================================== */

    const [
        recommendation,
        setRecommendation
    ] = useState(null);


    /* =====================================================
       STATE
    ===================================================== */

    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        generating,
        setGenerating
    ] = useState(false);


    const [
        actionLoading,
        setActionLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        message,
        setMessage
    ] = useState("");


    /* =====================================================
       LOAD PAGE
    ===================================================== */

    useEffect(() => {

        const loadPage =
            async () => {

                try {

                    const [
                        userResult,
                        shipmentResult,
                        recommendationResult
                    ] = await Promise.all([
                        getMe(),
                        getShipments(),
                        getRecommendations("PENDING")
                    ]);


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


                    const shipmentList =
                        shipmentResult?.shipments ||
                        [];


                    setShipments(
                        shipmentList
                    );


                    /*
                     * Use the first shipment by default.
                     */

                    if (
                        shipmentList.length > 0
                    ) {

                        setSelectedShipment(
                            shipmentList[0]
                        );

                    }


                    /*
                     * If the backend already has a
                     * pending recommendation, use it.
                     */

                    const pendingRecommendations =
                        recommendationResult
                            ?.recommendations ||
                        [];


                    if (
                        pendingRecommendations.length > 0
                    ) {

                        setRecommendation(
                            pendingRecommendations[0]
                        );

                    }

                } catch (error) {

                    console.error(
                        "Rerouting page error:",
                        error
                    );


                    setError(
                        error.message ||
                        "Unable to load rerouting"
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
        navigate
    ]);


    /* =====================================================
       SELECT SHIPMENT
    ===================================================== */

    const handleShipmentChange = (
        shipmentId
    ) => {

        const shipment =
            shipments.find(
                item =>
                    item._id ===
                    shipmentId
            );


        setSelectedShipment(
            shipment ||
            null
        );


        setRecommendation(
            null
        );


        setMessage(
            ""
        );


        setError(
            ""
        );

    };


    /* =====================================================
       GENERATE
    ===================================================== */

    const handleGenerate =
        async () => {

            if (
                !selectedShipment?._id
            ) {

                setError(
                    "Select a shipment first."
                );

                return;

            }


            setGenerating(
                true
            );

            setError(
                ""
            );

            setMessage(
                ""
            );


            try {

                const result =
                    await generateRecommendation(
                        selectedShipment._id
                    );


                if (
                    !result?.success
                ) {

                    throw new Error(
                        result?.message ||
                        "Unable to generate recommendation"
                    );

                }


                setRecommendation(
                    result.recommendation
                );


                setMessage(
                    result.message ||
                    "Recommendation generated successfully."
                );

            } catch (error) {

                console.error(
                    "Generate recommendation error:",
                    error
                );


                setError(
                    error.message ||
                    "Unable to generate recommendation"
                );

            } finally {

                setGenerating(
                    false
                );

            }

        };


    /* =====================================================
       APPROVE
    ===================================================== */

    const handleApprove =
        async () => {

            if (
                !recommendation?._id
            ) {

                return;

            }


            setActionLoading(
                true
            );

            setError(
                ""
            );

            setMessage(
                ""
            );


            try {

                const result =
                    await approveRecommendation(
                        recommendation._id
                    );


                if (
                    !result?.success
                ) {

                    throw new Error(
                        result?.message ||
                        "Unable to approve reroute"
                    );

                }


                setRecommendation(
                    result.recommendation
                );


                setMessage(
                    result.message ||
                    "Reroute approved successfully."
                );

            } catch (error) {

                console.error(
                    "Approve reroute error:",
                    error
                );


                setError(
                    error.message ||
                    "Unable to approve reroute"
                );

            } finally {

                setActionLoading(
                    false
                );

            }

        };


    /* =====================================================
       REJECT
    ===================================================== */

    const handleReject =
        async () => {

            if (
                !recommendation?._id
            ) {

                return;

            }


            setActionLoading(
                true
            );

            setError(
                ""
            );

            setMessage(
                ""
            );


            try {

                const result =
                    await rejectRecommendation(
                        recommendation._id
                    );


                if (
                    !result?.success
                ) {

                    throw new Error(
                        result?.message ||
                        "Unable to reject recommendation"
                    );

                }


                setRecommendation(
                    result.recommendation
                );


                setMessage(
                    result.message ||
                    "Recommendation rejected."
                );

            } catch (error) {

                console.error(
                    "Reject recommendation error:",
                    error
                );


                setError(
                    error.message ||
                    "Unable to reject recommendation"
                );

            } finally {

                setActionLoading(
                    false
                );

            }

        };


    /* =====================================================
       ALTERNATIVES
    ===================================================== */

    const alternatives =
        useMemo(
            () =>
                recommendation
                    ?.alternatives ||
                [],
            [
                recommendation
            ]
        );


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (
            <main className="rerouting-loading">
                Loading rerouting...
            </main>
        );

    }


    if (
        error &&
        !user
    ) {

        return (
            <main className="rerouting-loading">

                <div>

                    <p>
                        {error}
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


    return (

        <main className="dashboard-shell">

            <DashboardSidebar
                user={user}
            />


            <section
                className="
                    dashboard-content
                    rerouting-page
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="rerouting-header">

                    <div>

                        <p className="dashboard-kicker">
                            ROUTE INTELLIGENCE
                        </p>


                        <h1>
                            Rerouting
                        </h1>


                        <p className="rerouting-subtitle">
                            Compare route risk,
                            accessibility and travel
                            cost before approving a
                            route change.
                        </p>

                    </div>


                    <div className="rerouting-state">

                        <span />

                        OPERATOR CONTROL

                    </div>

                </header>


                {/* =================================================
                    SHIPMENT SELECTOR
                ================================================= */}

                <section className="rerouting-selector">

                    <div>

                        <span>
                            SHIPMENT
                        </span>


                        <select
                            value={
                                selectedShipment?._id ||
                                ""
                            }

                            onChange={event =>
                                handleShipmentChange(
                                    event.target.value
                                )
                            }
                        >

                            <option
                                value=""
                                disabled
                            >
                                Select shipment
                            </option>


                            {shipments.map(
                                shipment => (

                                    <option
                                        key={
                                            shipment._id
                                        }

                                        value={
                                            shipment._id
                                        }
                                    >
                                        {
                                            shipment.trackingId
                                        }

                                        {" — "}

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

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <button
                        type="button"

                        className="generate-button"

                        onClick={
                            handleGenerate
                        }

                        disabled={
                            generating ||
                            !selectedShipment
                        }
                    >

                        {generating
                            ? "CALCULATING..."
                            : "GENERATE RECOMMENDATION"}

                    </button>

                </section>


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (

                    <div
                        className="
                            rerouting-message
                            rerouting-error
                        "
                    >
                        {error}
                    </div>

                )}


                {message && (

                    <div
                        className="
                            rerouting-message
                            rerouting-success
                        "
                    >
                        {message}
                    </div>

                )}


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {!recommendation && (

                    <section
                        className="
                            rerouting-empty
                        "
                    >

                        <div>

                            <span>
                                NO PENDING RECOMMENDATION
                            </span>


                            <h2>
                                Generate a route analysis
                            </h2>


                            <p>
                                Select a shipment and run
                                the recommendation engine
                                to compare available routes.
                            </p>

                        </div>

                    </section>

                )}


                {/* =================================================
                    RECOMMENDATION
                ================================================= */}

                {recommendation && (

                    <>

                        {/* =========================================
                            COMPARISON
                        ========================================= */}

                        <section
                            className="
                                rerouting-comparison
                            "
                        >

                            <article
                                className="
                                    route-card
                                    current-route-card
                                "
                            >

                                <span>
                                    CURRENT ROUTE
                                </span>


                                <h2>
                                    {
                                        recommendation
                                            .currentRoute
                                            ?.name ||
                                        "Current route"
                                    }
                                </h2>


                                <div
                                    className="
                                        route-card-metrics
                                    "
                                >

                                    <div>

                                        <span>
                                            DISTANCE
                                        </span>

                                        <strong>
                                            {
                                                recommendation
                                                    .currentRoute
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
                                                recommendation
                                                    .currentRoute
                                                    ?.estimatedTime ??
                                                "—"
                                            }
                                            {" min"}
                                        </strong>

                                    </div>

                                </div>

                            </article>


                            <div
                                className="
                                    comparison-arrow
                                "
                            >
                                →
                            </div>


                            <article
                                className="
                                    route-card
                                    recommended-route-card
                                "
                            >

                                <div
                                    className="
                                        recommended-label
                                    "
                                >
                                    RECOMMENDED
                                </div>


                                <h2>
                                    {
                                        recommendation
                                            .recommendedRoute
                                            ?.name ||
                                        "Recommended route"
                                    }
                                </h2>


                                <div
                                    className="
                                        route-card-metrics
                                    "
                                >

                                    <div>

                                        <span>
                                            DISTANCE
                                        </span>

                                        <strong>
                                            {
                                                recommendation
                                                    .recommendedRoute
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
                                                recommendation
                                                    .recommendedRoute
                                                    ?.estimatedTime ??
                                                "—"
                                            }
                                            {" min"}
                                        </strong>

                                    </div>

                                </div>

                            </article>

                        </section>


                        {/* =========================================
                            INTELLIGENCE METRICS
                        ========================================= */}

                        <section
                            className="
                                recommendation-metrics
                            "
                        >

                            <article>

                                <span>
                                    RISK SCORE
                                </span>


                                <strong>
                                    {
                                        recommendation
                                            .riskScore ??
                                        "—"
                                    }
                                </strong>


                                <small>
                                    Recommended route
                                </small>

                            </article>


                            <article>

                                <span>
                                    RISK REDUCTION
                                </span>


                                <strong>
                                    {
                                        recommendation
                                            .riskReduction ??
                                        "—"
                                    }
                                </strong>


                                <small>
                                    Points reduced
                                </small>

                            </article>


                            <article>

                                <span>
                                    ACCESSIBILITY
                                </span>


                                <strong>
                                    {
                                        recommendation
                                            .accessibilityScore ??
                                        "—"
                                    }
                                </strong>


                                <small>
                                    Route accessibility
                                </small>

                            </article>


                            <article>

                                <span>
                                    CONFIDENCE
                                </span>


                                <strong>
                                    {
                                        recommendation
                                            .confidence ??
                                        "—"
                                    }
                                    %
                                </strong>


                                <small>
                                    Recommendation confidence
                                </small>

                            </article>


                            <article>

                                <span>
                                    EXPECTED DELAY
                                </span>


                                <strong>
                                    {
                                        recommendation
                                            .expectedDelay ??
                                        0
                                    }
                                    {" min"}
                                </strong>


                                <small>
                                    Additional travel time
                                </small>

                            </article>

                        </section>


                        {/* =========================================
                            REASONS + ALTERNATIVES
                        ========================================= */}

                        <section
                            className="
                                rerouting-analysis
                            "
                        >

                            <div
                                className="
                                    recommendation-reasons
                                "
                            >

                                <div
                                    className="
                                        section-heading
                                    "
                                >

                                    <span>
                                        DECISION BASIS
                                    </span>


                                    <h2>
                                        Why this route?
                                    </h2>

                                </div>


                                <div
                                    className="
                                        reasons-list
                                    "
                                >

                                    {recommendation
                                        .reasons
                                        ?.map(
                                            (
                                                reason,
                                                index
                                            ) => (

                                                <div
                                                    key={
                                                        `${reason}-${index}`
                                                    }
                                                    className="
                                                        reason-item
                                                    "
                                                >

                                                    <span>
                                                        0
                                                        {
                                                            index +
                                                            1
                                                        }
                                                    </span>


                                                    <p>
                                                        {
                                                            reason
                                                        }
                                                    </p>

                                                </div>

                                            )
                                        )}

                                </div>

                            </div>


                            <div
                                className="
                                    alternatives-panel
                                "
                            >

                                <div
                                    className="
                                        section-heading
                                    "
                                >

                                    <span>
                                        CANDIDATES
                                    </span>


                                    <h2>
                                        Route alternatives
                                    </h2>

                                </div>


                                <div
                                    className="
                                        alternatives-list
                                    "
                                >

                                    {alternatives.map(
                                        (
                                            alternative,
                                            index
                                        ) => (

                                            <div
                                                key={
                                                    alternative.route ||
                                                    index
                                                }
                                                className="
                                                    alternative-row
                                                "
                                            >

                                                <div>

                                                    <strong>
                                                        Route{" "}
                                                        {index +
                                                            1}
                                                    </strong>


                                                    <span>
                                                        Score
                                                        {" "}
                                                        {
                                                            alternative
                                                                .score
                                                        }
                                                    </span>

                                                </div>


                                                <div>

                                                    <span>
                                                        {
                                                            alternative
                                                                .distance
                                                        }
                                                        {" km"}
                                                    </span>


                                                    <span>
                                                        {
                                                            alternative
                                                                .eta
                                                        }
                                                        {" min"}
                                                    </span>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        </section>


                        {/* =========================================
                            ACTIONS
                        ========================================= */}

                        <section
                            className="
                                rerouting-actions
                            "
                        >

                            <div>

                                <span>
                                    RECOMMENDATION STATUS
                                </span>


                                <strong>
                                    {
                                        recommendation
                                            .status ||
                                        "PENDING"
                                    }
                                </strong>

                            </div>


                            {recommendation.status ===
                                "PENDING" && (

                                <div
                                    className="
                                        rerouting-buttons
                                    "
                                >

                                    <button
                                        type="button"

                                        className="
                                            reject-button
                                        "

                                        onClick={
                                            handleReject
                                        }

                                        disabled={
                                            actionLoading
                                        }
                                    >
                                        Reject
                                    </button>


                                    <button
                                        type="button"

                                        className="
                                            approve-button
                                        "

                                        onClick={
                                            handleApprove
                                        }

                                        disabled={
                                            actionLoading
                                        }
                                    >
                                        {
                                            actionLoading
                                                ? "PROCESSING..."
                                                : "Approve Reroute"
                                        }
                                    </button>

                                </div>

                            )}

                        </section>

                    </>

                )}

            </section>

        </main>
    );
};


export default Rerouting;