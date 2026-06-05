import { useNavigate } from "react-router-dom";

function NotFoundPage() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="text-center">

                <h1 className="text-8xl font-bold text-violet-600">

                    404

                </h1>

                <h2 className="text-3xl font-bold mt-4">

                    Page Not Found

                </h2>

                <p className="text-slate-500 mt-4">

                    The page you are looking for does not exist.

                </p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-8 bg-violet-600 text-white px-8 py-4 rounded-2xl"
                >

                    Go To Dashboard

                </button>

            </div>

        </div>
    );
}

export default NotFoundPage;