import { NavLink } from "react-router-dom";

import { logoutUser } from "../services/auth";

function Sidebar() {

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: "Upload",
            path: "/upload"
        },
        {
            name: "Analysis",
            path: "/analysis"
        },
        {
            name: "Medical Chat",
            path: "/chat"
        },
        {
            name: "Profile",
            path: "/profile"
        },
        {
            name: "Settings",
            path: "/settings"
        }
    ];

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-slate-950 text-white min-h-screen">

            <div className="p-8 border-b border-slate-800">

                <h1 className="text-3xl font-bold text-violet-400">

                    MedSphere AI

                </h1>

                <p className="text-slate-400 mt-2">

                    Healthcare Platform

                </p>

            </div>

            <div className="flex-1 p-4">

                {
                    menus.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `block p-4 rounded-2xl mb-3 ${
                                    isActive
                                        ? "bg-violet-600"
                                        : "hover:bg-slate-900"
                                }`
                            }
                        >

                            {item.name}

                        </NavLink>

                    ))
                }

            </div>

            <div className="p-4">

                <button
                    onClick={logoutUser}
                    className="w-full h-14 bg-red-500 rounded-2xl"
                >

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;