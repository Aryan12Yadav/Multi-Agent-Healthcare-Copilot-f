import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

import { getReports } from "../services/reportService";

function AnalysisPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [reports, setReports] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async() => {

        try {

            const response =
                await getReports();

            setReports(
                Array.isArray(response)
                    ? response
                    : []
            );

        } catch(error) {

            console.log(error);

            setError(true);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (
            <LoadingSpinner
                title="Loading Analysis"
                description="Fetching reports"
            />
        );
    }

    if (error) {

        return (
            <ErrorState
                title="Analysis Error"
                description="Unable to load reports"
            />
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 overflow-x-hidden">

                <Header />

                <div className="p-8">

                    <div className="bg-white rounded-[32px] p-8 shadow-sm">

                        <h1 className="text-4xl font-bold">

                            Medical Analysis Center

                        </h1>

                        <p className="text-slate-500 mt-3">

                            All analyzed reports and AI insights

                        </p>

                    </div>

                    {
                        reports.length === 0
                            ? (
                                <div className="mt-8">

                                    <EmptyState
                                        title="No Reports Available"
                                        description="Upload a report to start AI analysis"
                                    />

                                </div>
                            )
                            : (
                                <div className="grid lg:grid-cols-2 gap-6 mt-8">

                                    {
                                        reports.map((report) => (

                                            <div
                                                key={report.id}
                                                className="bg-white rounded-[32px] p-6 shadow-sm"
                                            >

                                                <div className="flex justify-between">

                                                    <div>

                                                        <h2 className="text-xl font-bold">

                                                            {
                                                                report.report_name ||
                                                                "Medical Report"
                                                            }

                                                        </h2>

                                                        <p className="text-slate-500 mt-2">

                                                            AI Analysis Completed

                                                        </p>

                                                    </div>

                                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                                                        <span className="text-green-600 font-bold">

                                                            89

                                                        </span>

                                                    </div>

                                                </div>

                                                <div className="mt-6">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/report/${report.id}`
                                                            )
                                                        }
                                                        className="bg-violet-600 text-white px-6 py-3 rounded-2xl"
                                                    >

                                                        View Analysis

                                                    </button>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>
                            )
                    }

                </div>

            </div>

        </div>
    );
}

export default AnalysisPage;