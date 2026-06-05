import {
    Link
} from "react-router-dom";

function Sidebar() {

    return (

        <aside className="sidebar">

            <h2>
                MedSphere AI
            </h2>

            <nav>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/reports">
                    Reports
                </Link>

                <Link to="/upload">
                    Upload Report
                </Link>

                <Link to="/chat">
                    AI Chat
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

            </nav>

        </aside>
    );
}

export default Sidebar;