import { Link } from "react-router-dom";

function LandingPage() {

    return (

        <div className="bg-slate-50 min-h-screen">

            <section className="max-w-7xl mx-auto px-8 py-28">

                <div className="text-center">

                    <h1 className="text-7xl font-bold text-slate-900">

                        MedSphere AI
                    </h1>

                    <p className="text-2xl text-slate-600 mt-8 max-w-4xl mx-auto">

                        AI Powered Healthcare Copilot for Medical Report Analysis,
                        Smart Healthcare Insights and Medical Assistance.

                    </p>

                    <div className="mt-10 flex justify-center gap-6">

                        <Link
                            to="/register"
                            className="bg-violet-600 text-white px-8 py-4 rounded-xl"
                        >

                            Get Started

                        </Link>

                        <Link
                            to="/login"
                            className="bg-white border px-8 py-4 rounded-xl"
                        >

                            Login

                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default LandingPage;