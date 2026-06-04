function RecentReportsCard() {

    const reports = [
        "Complete Blood Count",
        "Liver Function Test",
        "Thyroid Profile",
        "MRI Brain Report"
    ];

    return (
        <div className="bg-white rounded-3xl p-6 border shadow-sm">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold">

                    Recent Reports

                </h2>

                <button className="text-violet-600">

                    View All

                </button>

            </div>

            <div className="space-y-4">

                {
                    reports.map((report, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-2xl bg-slate-50 border"
                        >
                            {report}
                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default RecentReportsCard;