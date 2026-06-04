import { Link } from "react-router-dom";

function Sidebar() {

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen">

            <div className="p-6 text-2xl font-bold">
                MedSphere AI
            </div>

            <nav className="px-4">

                <Link to="/dashboard" className="block py-3">
                    Dashboard
                </Link>

                <Link to="/upload-report" className="block py-3">
                    Upload Report
                </Link>

                <Link to="/report-analysis" className="block py-3">
                    Analysis
                </Link>

                <Link to="/medical-chat" className="block py-3">
                    Medical Chat
                </Link>

            </nav>

        </aside>
    );
}

export default Sidebar;