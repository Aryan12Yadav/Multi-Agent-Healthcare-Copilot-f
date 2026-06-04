import DashboardLayout from "../layouts/DashboardLayout";

function ReportAnalysisPage() {

    return (

        <DashboardLayout>

            <div className="p-8 bg-slate-50 min-h-screen">

                <div className="bg-white rounded-3xl shadow p-8 mb-8">

                    <h1 className="text-4xl font-bold">

                        Report Analysis
                    </h1>

                    <p className="text-slate-500 mt-2">

                        AI generated medical insights
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-white rounded-3xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-4">

                            AI Summary
                        </h2>

                        <p>

                            Report appears mostly normal.
                            Minor abnormalities detected.
                        </p>

                    </div>

                    <div className="bg-white rounded-3xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-4">

                            Health Score
                        </h2>

                        <h1 className="text-6xl font-bold text-green-600">

                            82
                        </h1>

                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow p-6 mt-6">

                    <h2 className="text-2xl font-bold mb-4">

                        Recommendations
                    </h2>

                    <ul className="space-y-3">

                        <li>Maintain healthy diet</li>

                        <li>Exercise regularly</li>

                        <li>Follow physician guidance</li>

                        <li>Repeat test after 3 months</li>

                    </ul>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default ReportAnalysisPage;