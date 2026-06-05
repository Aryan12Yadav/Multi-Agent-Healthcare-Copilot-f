function RecentReportsCard() {

    const reports = [
        "Complete Blood Count",
        "Liver Function Test",
        "Thyroid Profile",
        "MRI Brain Report"
    ];

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">

                    Recent Reports

                </h2>

                <button className="text-violet-600 font-semibold">

                    View All

                </button>

            </div>

            <div className="space-y-4">

                {
                    reports.map((report, index) => (

                        <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                        >

                            <div>

                                <h3 className="font-semibold">

                                    {report}

                                </h3>

                                <p className="text-sm text-slate-500 mt-1">

                                    Analysis Completed

                                </p>

                            </div>

                            <span className="px-3 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-medium">

                                Ready

                            </span>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}

export default RecentReportsCard;