import { useEffect } from "react";
import { useState } from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";

import ReportCard from "../components/ReportCard";

function Reports() {

    const [reports, setReports] =
        useState([]);

    useEffect(() => {

        fetchReports();

    }, []);

    const fetchReports =
        async () => {

        try {

            const response =
                await api.get(
                    "/reports"
                );

            setReports(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <Navbar />

            <div className="page-container">

                <h1>
                    Reports
                </h1>

                <div className="reports-grid">

                    {
                        reports.map(
                            (report) => (
                                <ReportCard
                                    key={report.id}
                                    report={report}
                                />
                            )
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default Reports;