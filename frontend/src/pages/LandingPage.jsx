import { Link } from "react-router-dom";

function LandingPage() {

    return (

        <div className="min-h-screen bg-slate-50">

            <section className="max-w-7xl mx-auto px-8 py-24">

                <div className="text-center">

                    <h1 className="text-7xl font-bold text-slate-900 mb-6">

                        MedSphere AI

                    </h1>

                    <p className="text-2xl text-slate-600 max-w-4xl mx-auto">

                        AI Powered Healthcare Copilot for Medical Report Analysis,
                        Disease Understanding, Healthcare Guidance and Smart
                        Medical Conversations.

                    </p>

                    <div className="mt-10 flex justify-center gap-6">

                        <Link
                            to="/register"
                            className="bg-purple-600 text-white px-8 py-4 rounded-xl"
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

            <section className="max-w-7xl mx-auto px-8 py-20">

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <h2 className="text-2xl font-bold mb-4">

                            Medical Report Analysis

                        </h2>

                        <p>

                            Upload blood reports, MRI reports, X-Ray reports,
                            prescriptions and get AI explanations.

                        </p>

                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <h2 className="text-2xl font-bold mb-4">

                            Healthcare AI Chat

                        </h2>

                        <p>

                            Ask medical questions and receive simplified
                            healthcare guidance.

                        </p>

                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <h2 className="text-2xl font-bold mb-4">

                            Health Tracking

                        </h2>

                        <p>

                            Monitor reports, findings and medical history
                            from one dashboard.

                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default LandingPage;