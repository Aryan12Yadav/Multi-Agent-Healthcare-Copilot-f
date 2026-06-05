import { NavLink } from "react-router-dom";

function MobileSidebar({
    isOpen,
    onClose
}) {

    if (!isOpen) {

        return null;
    }

    const menus = [
        {
            title: "Dashboard",
            path: "/dashboard"
        },
        {
            title: "Upload",
            path: "/upload"
        },
        {
            title: "Analysis",
            path: "/analysis"
        },
        {
            title: "Medical Chat",
            path: "/chat"
        },
        {
            title: "Profile",
            path: "/profile"
        },
        {
            title: "Settings",
            path: "/settings"
        }
    ];

    return (
        <div className="fixed inset-0 z-50 lg:hidden">

            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/50"
            />

            <div className="absolute left-0 top-0 w-72 h-full bg-slate-950 text-white">

                <div className="p-6 border-b border-slate-800 flex justify-between items-center">

                    <div>

                        <h1 className="text-2xl font-bold text-violet-400">

                            MedSphere AI

                        </h1>

                        <p className="text-slate-400 text-sm mt-1">

                            Healthcare Platform

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >

                        ×

                    </button>

                </div>

                <div className="p-4">

                    {
                        menus.map(
                            (menu) => (

                                <NavLink
                                    key={menu.path}
                                    to={menu.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `block p-4 rounded-2xl mb-3 ${
                                            isActive
                                                ? "bg-violet-600"
                                                : "bg-slate-900"
                                        }`
                                    }
                                >

                                    {menu.title}

                                </NavLink>

                            )
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default MobileSidebar;