import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    logoutUser
} from "../../api/auth.api";

import "./dashboard-sidebar.scss";


const navigation = [
    {
        label: "Overview",
        path: "/dashboard"
    },
    {
        label: "Shipments",
        path: "/shipments"
    },
    {
        label: "Live Map",
        path: "/map"
    },
    {
        label: "Incidents",
        path: "/incidents"
    },
    {
        label: "Rerouting",
        path: "/rerouting"
    }
];


const DashboardSidebar = ({
    user
}) => {

    const navigate =
        useNavigate();


    const handleLogout = async () => {

        try {

            await logoutUser();

            navigate(
                "/login",
                {
                    replace: true
                }
            );

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

            /*
             * For the prototype, return
             * to login even if the server
             * request fails.
             */
            navigate(
                "/login",
                {
                    replace: true
                }
            );
        }
    };


    return (
        <aside className="dashboard-sidebar">

            {/* BRAND */}

            <button
                type="button"
                className="dashboard-sidebar-brand"
                onClick={() =>
                    navigate("/dashboard")
                }
                aria-label="Go to dashboard"
            >
                NER<span>.</span>
            </button>


            {/* LABEL */}

            <div className="dashboard-sidebar-label">
                CONTROL CENTER
            </div>


            {/* NAVIGATION */}

            <nav
                className="dashboard-sidebar-nav"
                aria-label="Dashboard navigation"
            >

                {navigation.map(
                    (item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={
                                item.path ===
                                "/dashboard"
                            }

                            className={({
                                isActive
                            }) =>
                                isActive
                                    ? "dashboard-nav-link active"
                                    : "dashboard-nav-link"
                            }
                        >

                            <span
                                className="dashboard-nav-dot"
                            />

                            <span>
                                {item.label}
                            </span>

                        </NavLink>

                    )
                )}

            </nav>


            {/* BOTTOM */}

            <div className="dashboard-sidebar-bottom">

                <div className="dashboard-sidebar-user">

                    <div className="dashboard-user-avatar">

                        {user?.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "N"}

                    </div>


                    <div className="dashboard-user-info">

                        <strong>
                            {user?.name ||
                                "User"}
                        </strong>


                        <span>
                            {user?.role ||
                                "OPERATOR"}
                        </span>

                    </div>

                </div>


                <button
                    type="button"
                    className="dashboard-logout-button"
                    onClick={handleLogout}
                >

                    <span
                        className="logout-icon"
                        aria-hidden="true"
                    >
                        ↪
                    </span>


                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
};


export default DashboardSidebar;