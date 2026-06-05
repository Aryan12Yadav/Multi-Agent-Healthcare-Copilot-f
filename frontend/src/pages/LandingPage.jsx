import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="max-w-7xl mx-auto px-6">

                <nav className="h-24 flex items-center justify-between">

                    <h1 className="text-4xl font-black text-violet-600">

                        MedSphere AI

                    </h1>

                    <div className="flex gap-4">

                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-3 rounded-2xl border"
                        >

                            Login

                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="px-6 py-3 rounded-2xl bg-violet-600 text-white"
                        >

                            Register

                        </button>

                    </div>

                </nav>

                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

                    <div>

                        <h1 className="text-7xl font-black leading-tight">

                            AI Powered Healthcare Intelligence
                        </h1>

                        <p className="text-xl text-slate-600 mt-8 leading-9">

                            Upload reports, get AI analysis,
                            track health metrics, chat with medical AI,
                            find hospitals and pharmacies,
                            estimate treatment costs.
                        </p>

                        <div className="flex gap-5 mt-10">

                            <button
                                onClick={() => navigate("/register")}
                                className="px-8 py-4 bg-violet-600 text-white rounded-2xl"
                            >

                                Get Started

                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="px-8 py-4 border rounded-2xl"
                            >

                                Login

                            </button>

                        </div>

                    </div>

                    <div>

                        <div className="bg-white rounded-[40px] p-10 shadow-xl">

                            <div className="grid grid-cols-2 gap-5">

                                <div className="bg-violet-50 p-6 rounded-3xl">

                                    <h2 className="text-4xl font-bold">

                                        AI

                                    </h2>

                                    <p className="mt-3">

                                        Medical Analysis
                                    </p>

                                </div>

                                <div className="bg-blue-50 p-6 rounded-3xl">

                                    <h2 className="text-4xl font-bold">

                                        OCR

                                    </h2>

                                    <p className="mt-3">

                                        Report Extraction
                                    </p>

                                </div>

                                <div className="bg-green-50 p-6 rounded-3xl">

                                    <h2 className="text-4xl font-bold">

                                        Chat

                                    </h2>

                                    <p className="mt-3">

                                        Medical Assistant
                                    </p>

                                </div>

                                <div className="bg-orange-50 p-6 rounded-3xl">

                                    <h2 className="text-4xl font-bold">

                                        Live

                                    </h2>

                                    <p className="mt-3">

                                        Health Tracking
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LandingPage;