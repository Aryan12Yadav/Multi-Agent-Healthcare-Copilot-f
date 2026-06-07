import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AdminSidebar() {

    const location =
        useLocation();

    return (

        <div className="sidebar">

            <div className="logo-section">

                <h4>
                    MedSphere Admin
                </h4>

                <p>
                    Admin Control Panel
                </p>

            </div>

            <div className="menu-section">

                <Link
                    to="/admin/dashboard"
                    className={
                        location.pathname === "/admin/dashboard"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >
                    <i className="bi bi-speedometer2"></i>
                    Dashboard
                </Link>

                <Link
                    to="/admin/users"
                    className={
                        location.pathname === "/admin/users"
                        ? "menu-item active"
                        : "menu-item"
                    }
                >
                    <i className="bi bi-people"></i>
                    Users
                </Link>

                <Link
                    to="/reports"
                    className="menu-item"
                >
                    <i className="bi bi-file-earmark-medical"></i>
                    All Reports
                </Link>

            </div>

        </div>
    );
}

export default AdminSidebar;