import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getReport } from "../services/reportService";

function ReportDetailsPage() {

    const { id } = useParams();

    const [report, setReport] = useState(null);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async() => {

        try {

            const response = await getReport(id);

            setReport(response);

        } catch(error) {

            console.log(error);
        }
    };

    if (!report) {

        return <div>Loading...</div>;
    }

    return (

        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-6">

                    Report Details

                </h1>

                <div className="bg-white rounded-xl shadow p-6">

                    <p><strong>Name:</strong> {report.report_name}</p>

                    <p><strong>Type:</strong> {report.report_type}</p>

                    <p><strong>Status:</strong> {report.processing_status}</p>

                    <p><strong>File:</strong> {report.original_file_name}</p>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default ReportDetailsPage;