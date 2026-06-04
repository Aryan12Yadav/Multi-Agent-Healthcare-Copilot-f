import { useEffect } from "react";
import { useState } from "react";
import { getDashboardMetrics } from "../services/dashboardService";

function RecentReports() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async() => {

        try {

            const response = await getDashboardMetrics();

            setReports(response.recent_reports || []);

        } catch(error) {

            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow">

            <h2 className="text-xl font-semibold mb-4">
                Recent Reports
            </h2>

            {
                reports.map(report => (
                    <div
                        key={report.id}
                        className="border-b py-3"
                    >
                        <p className="font-medium">
                            {report.report_name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {report.processing_status}
                        </p>
                    </div>
                ))
            }

        </div>
    );
}

export default RecentReports;