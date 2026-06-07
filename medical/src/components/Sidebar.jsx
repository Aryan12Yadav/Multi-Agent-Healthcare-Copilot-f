import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Sidebar() {

    const location =
        useLocation();

    return (

        <div className="sidebar">

            <div className="logo-section">

                <h4>
                    MedSphere AI
                </h4>

                <p>
                    Healthcare Intelligence
                </p>

            </div>

            <div className="menu-section">

                <Link
                    to="/dashboard"
                    className={
                        location.pathname === "/dashboard"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >

                    <i className="bi bi-speedometer2"></i>

                    Dashboard

                </Link>

                <Link
                    to="/upload"
                    className={
                        location.pathname === "/upload"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >

                    <i className="bi bi-cloud-upload"></i>

                    Upload Report

                </Link>

                <Link
                    to="/reports"
                    className={
                        location.pathname === "/reports"
                        ||
                        location.pathname.includes(
                            "/report/"
                        )
                        ? "menu-item active"
                        : "menu-item"
                    }
                >

                    <i className="bi bi-file-earmark-medical"></i>

                    Reports

                </Link>

                <Link
                    to="/compare-reports"
                    className={
                        location.pathname === "/compare-reports"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >

                    <i className="bi bi-bar-chart-line"></i>

                    Compare Reports

                </Link>

                <Link
                    to="/patient-profile"
                    className={
                        location.pathname === "/patient-profile"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >

                    <i className="bi bi-heart-pulse"></i>

                    Patient Insights

                </Link>

                <Link
                    to="/profile"
                    className={
                        location.pathname === "/profile"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >

                    <i className="bi bi-person-circle"></i>

                    Profile

                </Link>

            </div>

        </div>
    );
}

export default Sidebar;