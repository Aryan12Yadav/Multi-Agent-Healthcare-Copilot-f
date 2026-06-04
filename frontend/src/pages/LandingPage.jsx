import { Link } from "react-router-dom";

function LandingPage() {

    return (

        <div className="min-h-screen bg-slate-50">

            <section className="max-w-7xl mx-auto px-8 py-20">

                <h1 className="text-6xl font-bold">

                    MedSphere AI
                </h1>

                <p className="text-xl mt-6">

                    Multi-Agent Healthcare Copilot
                </p>

                <p className="mt-6 max-w-3xl">

                    Upload medical reports,
                    understand findings,
                    chat with AI and track
                    your healthcare journey.
                </p>

                <div className="mt-8 flex gap-4">

                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >

                        Get Started

                    </Link>

                    <Link
                        to="/login"
                        className="border px-6 py-3 rounded-lg"
                    >

                        Login

                    </Link>

                </div>

            </section>

        </div>
    );
}

export default LandingPage;