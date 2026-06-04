import { useEffect } from "react";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { getAnalysis } from "../services/reportService";

function AnalysisPage() {

    const [loading, setLoading] = useState(true);

    const [analysis, setAnalysis] = useState({
        report_name: "CBC Report",
        health_score: 89,
        summary: "",
        findings: [],
        recommendations: []
    });

    useEffect(() => {

        loadAnalysis();

    }, []);

    const loadAnalysis = async() => {

        try {

            const response = await getAnalysis(
                1
            );

            setAnalysis(
                response
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

                Loading Analysis...

            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-[40px] p-10 text-white">

                        <div className="flex justify-between items-center">

                            <div>

                                <h1 className="text-5xl font-bold">

                                    Medical Analysis

                                </h1>

                                <p className="mt-4 text-violet-100">

                                    AI Generated Healthcare Insights

                                </p>

                            </div>

                            <div className="bg-white/10 rounded-3xl p-8">

                                <p>

                                    Health Score

                                </p>

                                <h2 className="text-7xl font-bold mt-3">

                                    {analysis.health_score}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-3 gap-6 mt-8">

                        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-sm">

                            <h2 className="text-3xl font-bold">

                                AI Summary

                            </h2>

                            <p className="text-slate-600 mt-6 leading-9">

                                {analysis.summary}

                            </p>

                        </div>

                        <div className="bg-white rounded-[40px] p-8 shadow-sm">

                            <h2 className="text-3xl font-bold">

                                Report

                            </h2>

                            <div className="mt-6">

                                <p className="text-slate-500">

                                    Report Name

                                </p>

                                <h3 className="text-xl font-semibold mt-2">

                                    {analysis.report_name}

                                </h3>

                            </div>

                            <button className="w-full bg-violet-600 text-white rounded-2xl h-14 mt-8">

                                Download Report

                            </button>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-[40px] p-8 shadow-sm">

                            <h2 className="text-3xl font-bold mb-8">

                                Key Findings

                            </h2>

                            <div className="space-y-4">

                                {
                                    analysis.findings?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="bg-red-50 border border-red-200 rounded-2xl p-5"
                                            >

                                                {item}

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        </div>

                        <div className="bg-white rounded-[40px] p-8 shadow-sm">

                            <h2 className="text-3xl font-bold mb-8">

                                Recommendations

                            </h2>

                            <div className="space-y-4">

                                {
                                    analysis.recommendations?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="bg-green-50 border border-green-200 rounded-2xl p-5"
                                            >

                                                {item}

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-[40px] p-8 shadow-sm mt-8">

                        <h2 className="text-3xl font-bold mb-6">

                            AI Action Center

                        </h2>

                        <div className="grid lg:grid-cols-4 gap-4">

                            <button className="h-16 bg-violet-600 text-white rounded-2xl">

                                Ask AI

                            </button>

                            <button className="h-16 bg-blue-600 text-white rounded-2xl">

                                Find Hospital

                            </button>

                            <button className="h-16 bg-green-600 text-white rounded-2xl">

                                Find Pharmacy

                            </button>

                            <button className="h-16 bg-orange-600 text-white rounded-2xl">

                                Cost Estimate

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AnalysisPage;