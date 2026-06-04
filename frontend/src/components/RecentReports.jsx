function RecentReports() {

    const reports = [
        {
            name: "Blood Test Report",
            date: "2026-06-01",
            status: "Analyzed"
        },
        {
            name: "MRI Brain",
            date: "2026-05-28",
            status: "Analyzed"
        },
        {
            name: "Chest X-Ray",
            date: "2026-05-20",
            status: "Pending"
        }
    ];

    return (

        <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                Recent Reports

            </h2>

            <div className="space-y-4">

                {
                    reports.map(report => (

                        <div
                            key={report.name}
                            className="flex justify-between items-center border-b pb-4"
                        >

                            <div>

                                <h3 className="font-semibold">

                                    {report.name}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    {report.date}

                                </p>

                            </div>

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                                {report.status}

                            </span>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default RecentReports;