import { Link } from "react-router-dom";

function AdminSidebar() {

    return (

        <div className="sidebar">

            <div className="logo-section">

                <h4>
                    MedSphere Admin
                </h4>

                <p>
                    Admin Panel
                </p>

            </div>

            <div className="menu-section">

                <Link
                    className="menu-item"
                    to="/admin/dashboard"
                >
                    Dashboard
                </Link>

                <Link
                    className="menu-item"
                    to="/admin/users"
                >
                    Users
                </Link>

            </div>

        </div>

    );
}

export default AdminSidebar;