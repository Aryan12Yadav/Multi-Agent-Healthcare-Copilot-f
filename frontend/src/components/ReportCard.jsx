import { useNavigate } from "react-router-dom";

function ReportTable({
    reports = []
}) {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden">

            <div className="p-8 border-b border-slate-100">

                <h2 className="text-2xl font-bold">

                    Reports

                </h2>

            </div>

            {
                reports.length === 0
                    ? (
                        <div className="p-12 text-center">

                            <h3 className="text-xl font-semibold">

                                No Reports Available

                            </h3>

                            <p className="text-slate-500 mt-2">

                                Upload your first medical report.

                            </p>

                        </div>
                    )
                    : (
                        <table className="w-full">

                            <thead>

                                <tr className="bg-slate-50">

                                    <th className="text-left p-5 font-semibold">

                                        Report Name

                                    </th>

                                    <th className="text-left p-5 font-semibold">

                                        Status

                                    </th>

                                    <th className="text-left p-5 font-semibold">

                                        Action

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    reports.map((report) => (

                                        <tr
                                            key={report.id}
                                            className="border-t border-slate-100 hover:bg-slate-50"
                                        >

                                            <td className="p-5 font-medium">

                                                {
                                                    report.report_name ||
                                                    "Medical Report"
                                                }

                                            </td>

                                            <td className="p-5">

                                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">

                                                    Completed

                                                </span>

                                            </td>

                                            <td className="p-5">

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/report/${report.id}`
                                                        )
                                                    }
                                                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl font-medium"
                                                >

                                                    View

                                                </button>

                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>
                    )
            }

        </div>
    );
}

export default ReportTable;