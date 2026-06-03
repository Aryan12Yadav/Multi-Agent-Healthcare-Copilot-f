import { Link } from "react-router-dom";


function Sidebar() {

    return (

        <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

            <h2 className="text-xl font-bold mb-8">

                MedSphere AI

            </h2>

            <ul className="space-y-4">

                <li>

                    <Link to="/dashboard">

                        Dashboard

                    </Link>

                </li>

                <li>

                    <Link to="/upload">

                        Upload Report

                    </Link>

                </li>

                <li>

                    <Link to="/chat">

                        Medical Chat

                    </Link>

                </li>

            </ul>

        </aside>
    );
}

export default Sidebar;