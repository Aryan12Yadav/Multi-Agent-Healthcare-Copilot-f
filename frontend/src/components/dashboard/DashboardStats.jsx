function DashboardStats({ metrics }) {

    return (

        <div className="grid grid-cols-4 gap-6">

            <div className="bg-white shadow rounded-2xl p-6">

                <h3>Total Reports</h3>

                <h1 className="text-3xl font-bold">

                    {metrics?.report_count || 0}

                </h1>

            </div>

            <div className="bg-white shadow rounded-2xl p-6">

                <h3>Abnormal Findings</h3>

                <h1 className="text-3xl font-bold">

                    {metrics?.analysis_count || 0}

                </h1>

            </div>

            <div className="bg-white shadow rounded-2xl p-6">

                <h3>Reminders</h3>

                <h1 className="text-3xl font-bold">

                    0

                </h1>

            </div>

            <div className="bg-white shadow rounded-2xl p-6">

                <h3>Health Score</h3>

                <h1 className="text-3xl font-bold">

                    {metrics?.health_score || 0}

                </h1>

            </div>

        </div>

    );
}

export default DashboardStats;