import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

import { apiGet } from "../services/api";

function DashboardPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({
        report_count: 0,
        analysis_count: 0,
        chat_count: 0,
        health_score: 0,
        recent_reports: [],
        latest_insights: []
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async() => {

        try {

            const response = await apiGet(
                "/dashboard"
            );

            setDashboard(
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
            <div className="min-h-screen flex items-center justify-center text-2xl">

                Loading...

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

                                    Welcome Back Aryan

                                </h1>

                                <p className="text-violet-100 mt-4 text-lg">

                                    AI Powered Healthcare Dashboard

                                </p>

                            </div>

                            <button
                                onClick={() => navigate("/upload")}
                                className="bg-white text-violet-700 px-8 py-4 rounded-2xl font-semibold"
                            >

                                Upload Report

                            </button>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-4 gap-6 mt-8">

                        <StatCard
                            title="Reports"
                            value={dashboard.report_count}
                        />

                        <StatCard
                            title="Analysis"
                            value={dashboard.analysis_count}
                        />

                        <StatCard
                            title="Chats"
                            value={dashboard.chat_count}
                        />

                        <StatCard
                            title="Health Score"
                            value={dashboard.health_score}
                        />

                    </div>

                    <div className="grid lg:grid-cols-3 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <h2 className="text-2xl font-bold">

                                Quick Actions

                            </h2>

                            <div className="space-y-4 mt-6">

                                <button
                                    onClick={() => navigate("/upload")}
                                    className="w-full h-14 bg-violet-600 text-white rounded-2xl"
                                >

                                    Upload Report

                                </button>

                                <button
                                    onClick={() => navigate("/analysis")}
                                    className="w-full h-14 bg-blue-600 text-white rounded-2xl"
                                >

                                    View Analysis

                                </button>

                                <button
                                    onClick={() => navigate("/chat")}
                                    className="w-full h-14 bg-green-600 text-white rounded-2xl"
                                >

                                    Ask Medical AI

                                </button>

                            </div>

                        </div>

                        <div className="lg:col-span-2 bg-white rounded-[32px] p-6 shadow-sm">

                            <h2 className="text-2xl font-bold">

                                AI Insights

                            </h2>

                            <div className="space-y-4 mt-6">

                                {
                                    dashboard.latest_insights?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="bg-violet-50 rounded-2xl p-4"
                                            >

                                                {item}

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm mt-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Recent Reports

                        </h2>

                        <div className="space-y-4">

                            {
                                dashboard.recent_reports?.map(report => (

                                    <div
                                        key={report.id}
                                        className="border border-slate-200 rounded-2xl p-5 flex justify-between items-center"
                                    >

                                        <div>

                                            <h3 className="font-semibold">

                                                {report.report_name}

                                            </h3>

                                            <p className="text-slate-500 mt-1">

                                                {report.created_at}

                                            </p>

                                        </div>

                                        <button
                                            onClick={() => navigate("/analysis")}
                                            className="bg-slate-100 px-5 py-2 rounded-xl"
                                        >

                                            View

                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;