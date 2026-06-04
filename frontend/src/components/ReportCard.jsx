function ReportCard({ report }) {

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-xl font-bold">

                        {report.report_name}

                    </h2>

                    <p className="text-slate-500 mt-2">

                        {report.created_at}

                    </p>

                </div>

                <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">

                    📄

                </div>

            </div>

        </div>
    );
}

export default ReportCard;