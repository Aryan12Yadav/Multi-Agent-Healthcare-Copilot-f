import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    const features = [
        {
            title: "AI Report Analysis",
            description: "Understand complex medical reports instantly."
        },
        {
            title: "Medical Assistant",
            description: "Ask health related questions anytime."
        },
        {
            title: "Health Tracking",
            description: "Monitor trends and health scores."
        },
        {
            title: "Smart Recommendations",
            description: "Receive personalized AI suggestions."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

            <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

                <h1 className="text-4xl font-bold text-violet-400">

                    MedSphere AI

                </h1>

                <div className="flex gap-4">

                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 rounded-xl border border-slate-700"
                    >

                        Login

                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="px-6 py-3 rounded-xl bg-violet-600"
                    >

                        Register

                    </button>

                </div>

            </nav>

            <section className="max-w-7xl mx-auto px-8 py-24">

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div>

                        <div className="inline-flex bg-violet-500/20 text-violet-300 px-5 py-2 rounded-full">

                            AI Powered Healthcare Platform

                        </div>

                        <h1 className="text-7xl font-bold leading-tight mt-8">

                            Understand
                            <br />

                            Medical Reports
                            <br />

                            In Seconds

                        </h1>

                        <p className="text-slate-400 text-xl leading-9 mt-8 max-w-2xl">

                            Upload reports, get AI analysis,
                            track health trends and chat
                            with an intelligent medical assistant.

                        </p>

                        <div className="flex gap-5 mt-12">

                            <button
                                onClick={() => navigate("/register")}
                                className="bg-violet-600 px-8 py-4 rounded-2xl text-lg font-semibold"
                            >

                                Get Started

                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="border border-slate-700 px-8 py-4 rounded-2xl text-lg"
                            >

                                Sign In

                            </button>

                        </div>

                    </div>

                    <div>

                        <div className="bg-slate-900 rounded-[40px] p-8 border border-slate-800">

                            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8">

                                <h2 className="text-2xl font-semibold">

                                    Health Score

                                </h2>

                                <h3 className="text-8xl font-bold mt-8">

                                    89

                                </h3>

                                <p className="text-violet-100 mt-4">

                                    Excellent Condition

                                </p>

                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-6">

                                <div className="bg-slate-800 rounded-2xl p-6">

                                    <h3 className="text-4xl font-bold">

                                        120+

                                    </h3>

                                    <p className="text-slate-400 mt-2">

                                        Reports
                                    </p>

                                </div>

                                <div className="bg-slate-800 rounded-2xl p-6">

                                    <h3 className="text-4xl font-bold">

                                        500+

                                    </h3>

                                    <p className="text-slate-400 mt-2">

                                        Analysis
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-8 pb-24">

                <h2 className="text-5xl font-bold text-center">

                    Everything You Need

                </h2>

                <p className="text-center text-slate-400 mt-6 text-xl">

                    Healthcare tools powered by AI

                </p>

                <div className="grid lg:grid-cols-4 gap-6 mt-16">

                    {
                        features.map((feature, index) => (

                            <div
                                key={index}
                                className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
                            >

                                <h3 className="text-2xl font-bold">

                                    {feature.title}

                                </h3>

                                <p className="text-slate-400 mt-4 leading-8">

                                    {feature.description}

                                </p>

                            </div>

                        ))
                    }

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-8 pb-24">

                <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-[40px] p-16 text-center">

                    <h2 className="text-6xl font-bold">

                        Start Your AI Healthcare Journey

                    </h2>

                    <p className="text-xl mt-6 text-violet-100">

                        Join thousands of users using AI for healthcare management.

                    </p>

                    <button
                        onClick={() => navigate("/register")}
                        className="bg-white text-violet-700 px-10 py-4 rounded-2xl mt-10 text-lg font-semibold"
                    >

                        Create Free Account

                    </button>

                </div>

            </section>

        </div>
    );
}

export default LandingPage;