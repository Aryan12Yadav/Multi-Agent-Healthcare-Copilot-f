import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <aside className="w-72 min-h-screen bg-white border-r">

            <div className="p-6 border-b">

                <h1 className="text-3xl font-bold text-purple-600">

                    MedSphere AI

                </h1>

                <p className="text-gray-500 mt-2">

                    Personal Healthcare Assistant

                </p>

            </div>

            <nav className="p-6 space-y-3">

                <Link className="block p-3 rounded-xl hover:bg-purple-50" to="/dashboard">

                    Dashboard

                </Link>

                <Link className="block p-3 rounded-xl hover:bg-purple-50" to="/upload-report">

                    Upload Report

                </Link>

                <Link className="block p-3 rounded-xl hover:bg-purple-50" to="/reports">

                    My Reports

                </Link>

                <Link className="block p-3 rounded-xl hover:bg-purple-50" to="/chat">

                    AI Chat

                </Link>

                <Link className="block p-3 rounded-xl hover:bg-purple-50" to="/profile">

                    Profile

                </Link>

            </nav>

        </aside>
    );
}

export default Sidebar;