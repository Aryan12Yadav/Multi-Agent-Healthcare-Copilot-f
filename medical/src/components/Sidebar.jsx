import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
    const location = useLocation();
    const { token, setShowAuthModal } = useContext(AuthContext);

    const handleProtectedClick = (e) => {
        if (!token) {
            e.preventDefault();
            setShowAuthModal(true);
        }
    };

    return (
        <div className="sidebar">
            <div className="logo-section">
                <h4>MedSphere AI</h4>
                <p>Healthcare Intelligence</p>
            </div>

            <div className="menu-section">
                <Link
                    to="/dashboard"
                    className={
                        location.pathname === "/dashboard" || location.pathname === "/"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >
                    <i className="bi bi-speedometer2"></i>
                    Dashboard
                </Link>

                <Link
                    to="/upload"
                    onClick={handleProtectedClick}
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
                    onClick={handleProtectedClick}
                    className={
                        location.pathname === "/reports" || location.pathname.includes("/report/")
                        ? "menu-item active"
                        : "menu-item"
                    }
                >
                    <i className="bi bi-file-earmark-medical"></i>
                    Reports
                </Link>

                <Link
                    to="/compare-reports"
                    onClick={handleProtectedClick}
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
                    onClick={handleProtectedClick}
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
                    onClick={handleProtectedClick}
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