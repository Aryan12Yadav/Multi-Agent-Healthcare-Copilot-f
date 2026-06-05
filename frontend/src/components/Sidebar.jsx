import { NavLink } from "react-router-dom";

function Sidebar() {

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: "Upload Report",
            path: "/upload"
        },
        {
            name: "Analysis",
            path: "/analysis"
        },
        {
            name: "AI Assistant",
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
        <aside
            className="
                hidden
                lg:flex
                flex-col
                w-64
                min-w-64
                bg-slate-950
                text-white
                min-h-screen
            "
        >

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
                                `
                                block
                                p-4
                                rounded-2xl
                                mb-3
                                transition-all
                                ${
                                    isActive
                                        ? "bg-violet-600 text-white"
                                        : "hover:bg-slate-900 text-slate-300"
                                }
                                `
                            }
                        >

                            {item.name}

                        </NavLink>

                    ))
                }

            </div>

            <div className="p-4 border-t border-slate-800">

                <div className="bg-slate-900 rounded-2xl p-4">

                    <p className="text-sm text-slate-400">

                        System Status

                    </p>

                    <p className="mt-2 text-green-400 font-semibold">

                        All Services Online

                    </p>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;