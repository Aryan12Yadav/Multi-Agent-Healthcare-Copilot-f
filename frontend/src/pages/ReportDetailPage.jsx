import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { getReportDetails } from "../services/reportService";
import { getAnalysis } from "../services/reportService";

function ReportDetailsPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [report, setReport] = useState({});

    const [analysis, setAnalysis] = useState({});

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async() => {

        try {

            const reportResponse = await getReportDetails(
                1
            );

            const analysisResponse = await getAnalysis(
                1
            );

            setReport(
                reportResponse
            );

            setAnalysis(
                analysisResponse
            );

        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                Loading Report...

            </div>
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

                                    {report.report_name || "Medical Report"}

                                </h1>

                                <p className="text-slate-500 mt-2">

                                    Uploaded Report Details
                                </p>

                            </div>

                            <button
                                className="bg-violet-600 text-white px-8 py-3 rounded-2xl"
                            >

                                Download PDF

                            </button>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-4 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Health Score

                            </p>

                            <h2 className="text-5xl font-bold text-green-600 mt-4">

                                {analysis.health_score || 89}

                            </h2>

                        </div>

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Findings

                            </p>

                            <h2 className="text-5xl font-bold mt-4">

                                {
                                    analysis.findings?.length || 0
                                }

                            </h2>

                        </div>

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Recommendations

                            </p>

                            <h2 className="text-5xl font-bold mt-4">

                                {
                                    analysis.recommendations?.length || 0
                                }

                            </h2>

                        </div>

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <p className="text-slate-500">

                                Status

                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-4">

                                Analyzed

                            </h2>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-2xl font-bold mb-6">

                                OCR Extracted Text

                            </h2>

                            <div className="bg-slate-50 rounded-2xl p-5 min-h-[400px] whitespace-pre-wrap">

                                {
                                    report.ocr_text ||
                                    "No OCR Data Available"
                                }

                            </div>

                        </div>

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-2xl font-bold mb-6">

                                AI Summary

                            </h2>

                            <div className="bg-violet-50 rounded-2xl p-5 min-h-[400px]">

                                {
                                    analysis.summary ||
                                    "No Summary Available"
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
                                    analysis.findings?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="bg-red-50 border border-red-200 rounded-2xl p-4"
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
                                    analysis.recommendations?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="bg-green-50 border border-green-200 rounded-2xl p-4"
                                            >

                                                {item}

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-[32px] p-8 shadow-sm mt-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Quick Actions
                        </h2>

                        <div className="grid lg:grid-cols-4 gap-4">

                            <button
                                onClick={() => navigate("/chat")}
                                className="h-14 bg-violet-600 text-white rounded-2xl"
                            >

                                Ask AI

                            </button>

                            <button
                                className="h-14 bg-blue-600 text-white rounded-2xl"
                            >

                                Find Hospital

                            </button>

                            <button
                                className="h-14 bg-green-600 text-white rounded-2xl"
                            >

                                Find Pharmacy

                            </button>

                            <button
                                className="h-14 bg-orange-600 text-white rounded-2xl"
                            >

                                Cost Estimate

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ReportDetailsPage;