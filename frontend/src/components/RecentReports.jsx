import { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import { getReports } from "../services/reportService";


function RecentReports() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);


    const loadReports = async() => {

        try {

            const response = await getReports();

            setReports(response);

        }

        catch(error) {

            console.log(error);
        }
    };

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-6">

                Recent Reports

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Type</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        reports.map((report) => (

                            <tr key={report.id}>

                                <td>

                                    {report.report_name}

                                </td>

                                <td>

                                    {report.report_type}

                                </td>

                                <td>

                                    {report.processing_status}

                                </td>

                                <td>

                                    <Link
                                        to={`/analysis/${report.id}`}
                                    >

                                        View

                                    </Link>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default RecentReports;