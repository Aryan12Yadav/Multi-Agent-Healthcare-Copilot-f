import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MobileSidebar from "./MobileSidebar";

function Header() {

    const navigate = useNavigate();

    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getTitle = () => {

        const path = location.pathname;

        if (path.includes("dashboard")) {

            return "Dashboard";
        }

        if (path.includes("upload")) {

            return "Upload Report";
        }

        if (path.includes("analysis")) {

            return "Medical Analysis";
        }

        if (path.includes("chat")) {

            return "Medical Assistant";
        }

        if (path.includes("profile")) {

            return "Profile";
        }

        if (path.includes("settings")) {

            return "Settings";
        }

        return "MedSphere AI";
    };

    return (
        <>
            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">

                <div className="h-20 px-6 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden w-12 h-12 rounded-xl bg-slate-100"
                        >

                            ☰

                        </button>

                        <div>

                            <h1 className="text-3xl font-bold">

                                {getTitle()}

                            </h1>

                            <p className="text-slate-500 text-sm">

                                AI Powered Healthcare Platform

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <button className="hidden lg:flex w-12 h-12 bg-slate-100 rounded-2xl items-center justify-center">

                            🔔

                        </button>

                        <button
                            onClick={() => navigate("/profile")}
                            className="flex items-center gap-3"
                        >

                            <div className="text-right hidden lg:block">

                                <h3 className="font-semibold">

                                    Aryan

                                </h3>

                                <p className="text-xs text-slate-500">

                                    Patient
                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                                A

                            </div>

                        </button>

                    </div>

                </div>

            </header>
        </>
    );
}

export default Header;