import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="w-72 bg-white border-r min-h-screen">

            <div className="p-8">

                <h1 className="text-3xl font-bold text-violet-600">

                    MedSphere AI

                </h1>

            </div>

            <div className="px-5 space-y-2">

                <Link className="block p-4 rounded-xl hover:bg-violet-50" to="/dashboard">

                    Dashboard

                </Link>

                <Link className="block p-4 rounded-xl hover:bg-violet-50" to="/upload-report">

                    Upload Report

                </Link>

                <Link className="block p-4 rounded-xl hover:bg-violet-50" to="/report-analysis">

                    Report Analysis

                </Link>

                <Link className="block p-4 rounded-xl hover:bg-violet-50" to="/chat">

                    Medical Chat

                </Link>

            </div>

        </div>
    );
}

export default Sidebar;