import { useNavigate } from "react-router-dom";

function ReportTable({
    reports = []
}) {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden">

            <div className="p-8 border-b">

                <h2 className="text-2xl font-bold">

                    Reports

                </h2>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="bg-slate-50">

                        <th className="text-left p-5">

                            Report Name

                        </th>

                        <th className="text-left p-5">

                            Status

                        </th>

                        <th className="text-left p-5">

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        reports.map((report) => (

                            <tr
                                key={report.id}
                                className="border-t"
                            >

                                <td className="p-5">

                                    {report.report_name}

                                </td>

                                <td className="p-5">

                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">

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
                                        className="bg-violet-600 text-white px-4 py-2 rounded-xl"
                                    >

                                        View

                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default ReportTable;