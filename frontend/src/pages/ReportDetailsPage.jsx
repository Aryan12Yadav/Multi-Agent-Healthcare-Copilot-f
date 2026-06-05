import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import {
    getReportDetails,
    getAnalysis
} from "../services/reportService";

function ReportDetailsPage() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [report, setReport] = useState(null);

    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {

        loadReport();

    }, [id]);

    const loadReport = async() => {

        try {

            const reportResponse =
                await getReportDetails(id);

            const analysisResponse =
                await getAnalysis(id);

            setReport(
                reportResponse
            );

            setAnalysis(
                analysisResponse
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
                title="Loading Report"
                description="Fetching report details"
            />
        );
    }

    if (error) {

        return (
            <ErrorState
                title="Unable To Load Report"
                description="Please try again later"
            />
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <div className="bg-white rounded-[32px] p-8 shadow-sm">

                        <div className="flex justify-between items-center">

                            <div>

                                <h1 className="text-4xl font-bold">

                                    {
                                        report?.report_name ||
                                        "Medical Report"
                                    }

                                </h1>

                                <p className="text-slate-500 mt-3">

                                    Detailed AI Analysis
                                </p>

                            </div>

                            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold">

                                Completed

                            </div>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-4 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Health Score

                            </p>

                            <h2 className="text-5xl font-bold text-green-600 mt-4">

                                {
                                    analysis?.health_score ||
                                    89
                                }

                            </h2>

                        </div>

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Findings

                            </p>

                            <h2 className="text-5xl font-bold mt-4">

                                {
                                    analysis?.findings?.length ||
                                    0
                                }

                            </h2>

                        </div>

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Recommendations

                            </p>

                            <h2 className="text-5xl font-bold mt-4">

                                {
                                    analysis?.recommendations?.length ||
                                    0
                                }

                            </h2>

                        </div>

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Status

                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-4">

                                Normal

                            </h2>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-2xl font-bold mb-6">

                                Report Content

                            </h2>

                            <div className="bg-slate-50 rounded-2xl p-5 min-h-[350px] whitespace-pre-wrap">

                                {
                                    report?.ocr_text ||
                                    report?.content ||
                                    "No report content available"
                                }

                            </div>

                        </div>

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-2xl font-bold mb-6">

                                AI Summary

                            </h2>

                            <div className="bg-violet-50 rounded-2xl p-5 min-h-[350px]">

                                {
                                    analysis?.summary ||
                                    "No summary available"
                                }

                            </div>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-2xl font-bold mb-6">

                                Findings

                            </h2>

                            <div className="space-y-4">

                                {
                                    analysis?.findings?.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="bg-red-50 border border-red-100 rounded-2xl p-4"
                                            >

                                                {item}

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        </div>

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-2xl font-bold mb-6">

                                Recommendations

                            </h2>

                            <div className="space-y-4">

                                {
                                    analysis?.recommendations?.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="bg-green-50 border border-green-100 rounded-2xl p-4"
                                            >

                                                {item}

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ReportDetailsPage;