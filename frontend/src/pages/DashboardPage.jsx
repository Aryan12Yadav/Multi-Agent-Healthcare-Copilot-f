import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

import { getDashboardData } from "../services/dashboardService";

function DashboardPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async() => {

        try {

            setLoading(true);

            const response = await getDashboardData();

            setDashboard(
                response
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
                title="Loading Dashboard"
                description="Fetching healthcare data"
            />
        );
    }

    if (error) {

        return (
            <ErrorState
                title="Dashboard Error"
                description="Unable to load dashboard"
            />
        );
    }

    if (!dashboard) {

        return (
            <EmptyState
                title="No Dashboard Data"
                description="No healthcare information available"
            />
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-[32px] p-10 text-white">

                        <h1 className="text-5xl font-bold">

                            Welcome Back Aryan

                        </h1>

                        <p className="mt-4 text-violet-100 text-lg">

                            AI Powered Healthcare Intelligence Platform
                        </p>

                        <button
                            onClick={() => navigate("/upload")}
                            className="mt-8 bg-white text-violet-700 px-8 py-4 rounded-2xl font-semibold"
                        >

                            Upload New Report

                        </button>

                    </div>

                    <div className="grid lg:grid-cols-4 gap-6 mt-8">

                        <StatCard
                            title="Reports"
                            value={dashboard.report_count || 0}
                        />

                        <StatCard
                            title="Analysis"
                            value={dashboard.analysis_count || 0}
                        />

                        <StatCard
                            title="Chats"
                            value={dashboard.chat_count || 0}
                        />

                        <StatCard
                            title="Health Score"
                            value={dashboard.health_score || 0}
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

                                    Open AI Assistant

                                </button>

                            </div>

                        </div>

                        <div className="lg:col-span-2 bg-white rounded-[32px] p-6 shadow-sm">

                            <h2 className="text-2xl font-bold mb-6">

                                AI Insights

                            </h2>

                            <div className="space-y-4">

                                {
                                    dashboard.latest_insights?.length > 0
                                        ? dashboard.latest_insights.map(
                                            (item, index) => (

                                                <div
                                                    key={index}
                                                    className="bg-violet-50 rounded-2xl p-4"
                                                >

                                                    {item}

                                                </div>

                                            )
                                        )
                                        : (
                                            <EmptyState
                                                title="No Insights"
                                                description="AI insights will appear here"
                                            />
                                        )
                                }

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm mt-8">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold">

                                Recent Reports

                            </h2>

                            <button
                                onClick={() => navigate("/analysis")}
                                className="text-violet-600 font-semibold"
                            >

                                View All

                            </button>

                        </div>

                        {
                            dashboard.recent_reports?.length > 0
                                ? (
                                    <div className="space-y-4">

                                        {
                                            dashboard.recent_reports.map(
                                                report => (

                                                    <div
                                                        key={report.id}
                                                        className="border border-slate-200 rounded-2xl p-5 flex justify-between items-center"
                                                    >

                                                        <div>

                                                            <h3 className="font-semibold">

                                                                {report.report_name}

                                                            </h3>

                                                        </div>

                                                        <button
                                                            onClick={() => navigate(`/report/${report.id}`)}
                                                            className="bg-slate-100 px-5 py-2 rounded-xl"
                                                        >

                                                            View

                                                        </button>

                                                    </div>

                                                )
                                            )
                                        }

                                    </div>
                                )
                                : (
                                    <EmptyState
                                        title="No Reports Found"
                                        description="Upload your first report"
                                    />
                                )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;