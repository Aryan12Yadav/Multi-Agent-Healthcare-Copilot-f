import { useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();

    const getTitle = () => {

        if (
            location.pathname.includes(
                "dashboard"
            )
        ) {

            return "Dashboard";
        }

        if (
            location.pathname.includes(
                "upload"
            )
        ) {

            return "Upload Report";
        }

        if (
            location.pathname.includes(
                "analysis"
            )
        ) {

            return "Analysis";
        }

        if (
            location.pathname.includes(
                "chat"
            )
        ) {

            return "AI Assistant";
        }

        if (
            location.pathname.includes(
                "profile"
            )
        ) {

            return "Profile";
        }

        if (
            location.pathname.includes(
                "settings"
            )
        ) {

            return "Settings";
        }

        return "MedSphere AI";
    };

    return (
        <header className="bg-white border-b border-slate-200">

            <div className="h-20 px-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        {getTitle()}

                    </h1>

                    <p className="text-slate-500 text-sm mt-1">

                        AI Powered Healthcare Platform

                    </p>

                </div>

                <div className="flex items-center gap-4">

                    <div className="text-right">

                        <p className="font-semibold">

                            Aryan

                        </p>

                        <p className="text-sm text-slate-500">

                            Patient

                        </p>

                    </div>

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            bg-violet-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                        "
                    >

                        A

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Header;