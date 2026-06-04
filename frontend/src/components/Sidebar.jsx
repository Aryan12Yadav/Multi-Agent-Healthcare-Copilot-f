import { NavLink } from "react-router-dom";

import { logoutUser } from "../services/auth";

function Sidebar() {

    const menus = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: "📊"
        },
        {
            title: "Upload Report",
            path: "/upload",
            icon: "📄"
        },
        {
            title: "Analysis",
            path: "/analysis",
            icon: "🧠"
        },
        {
            title: "Medical Chat",
            path: "/chat",
            icon: "💬"
        },
        {
            title: "Profile",
            path: "/profile",
            icon: "👤"
        }
    ];

    return (
        <aside className="w-72 bg-slate-950 text-white min-h-screen flex flex-col">

            <div className="px-8 py-8 border-b border-slate-800">

                <h1 className="text-3xl font-bold text-violet-400">

                    MedSphere AI

                </h1>

                <p className="text-slate-400 mt-2">

                    Healthcare Intelligence

                </p>

            </div>

            <div className="flex-1 p-4">

                <p className="text-slate-500 uppercase text-xs tracking-widest px-4 mb-4">

                    Navigation

                </p>

                {
                    menus.map(item => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition-all ${
                                    isActive
                                        ? "bg-violet-600 text-white shadow-lg"
                                        : "text-slate-300 hover:bg-slate-900"
                                }`
                            }
                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            <span className="font-medium">

                                {item.title}

                            </span>

                        </NavLink>

                    ))
                }

            </div>

            <div className="px-4 pb-4">

                <div className="bg-slate-900 rounded-3xl p-5">

                    <p className="text-slate-400 text-sm">

                        Overall Health Score

                    </p>

                    <h2 className="text-5xl font-bold text-green-400 mt-3">

                        89

                    </h2>

                    <p className="text-green-400 mt-2">

                        Excellent
                    </p>

                </div>

            </div>

            <div className="p-4 border-t border-slate-800">

                <button
                    onClick={logoutUser}
                    className="w-full bg-red-500 hover:bg-red-600 h-12 rounded-2xl font-medium transition"
                >

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;