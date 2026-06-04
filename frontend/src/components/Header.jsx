import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {

    const location = useLocation();

    const navigate = useNavigate();

    const getPageTitle = () => {

        switch(location.pathname) {

            case "/dashboard":
                return "Dashboard";

            case "/upload":
                return "Upload Medical Report";

            case "/analysis":
                return "Medical Analysis";

            case "/chat":
                return "AI Medical Assistant";

            case "/profile":
                return "Profile";

            default:
                return "MedSphere AI";
        }
    };

    const currentDate = new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

    return (
        <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-40">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-slate-900">

                        {getPageTitle()}

                    </h1>

                    <p className="text-slate-500 mt-1">

                        {currentDate}

                    </p>

                </div>

                <div className="flex items-center gap-5">

                    <div className="hidden lg:block">

                        <input
                            type="text"
                            placeholder="Search reports, analysis..."
                            className="w-80 h-12 border border-slate-300 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />

                    </div>

                    <button className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 transition">

                        🔔

                    </button>

                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-2 hover:bg-slate-200 transition"
                    >

                        <div>

                            <p className="font-semibold text-sm">

                                Aryan

                            </p>

                            <p className="text-xs text-slate-500">

                                Healthcare User

                            </p>

                        </div>

                        <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                            A

                        </div>

                    </button>

                </div>

            </div>

        </header>
    );
}

export default Header;