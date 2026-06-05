import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import HealthScoreCard from "../components/HealthScoreCard";
import RecentActivity from "../components/RecentActivity";
import AgentCard from "../components/AgentCard";
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

            setError(false);

            const response =
                await getDashboardData();

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
                description="Preparing your healthcare workspace"
            />
        );
    }

    if (error) {

        return (
            <ErrorState
                title="Dashboard Error"
                description="Unable to load dashboard data"
            />
        );
    }

    if (!dashboard) {

        return (
            <EmptyState
                title="No Dashboard Data"
                description="Dashboard information is unavailable"
            />
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-6 lg:p-8">

                    <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 rounded-[32px] p-10 text-white shadow-lg">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                            <div>

                                <h1 className="text-4xl lg:text-5xl font-bold">

                                    Welcome Back Aryan

                                </h1>

                                <p className="mt-4 text-violet-100 text-lg">

                                    AI Powered Healthcare Intelligence Platform
                                </p>

                                <p className="mt-2 text-violet-200">

                                    Upload reports, analyze health data and chat with AI agents.
                                </p>

                            </div>

                            <div className="flex flex-wrap gap-4">

                                <button
                                    onClick={() => navigate("/upload")}
                                    className="bg-white text-violet-700 px-8 py-4 rounded-2xl font-semibold"
                                >

                                    Upload Report

                                </button>

                                <button
                                    onClick={() => navigate("/chat")}
                                    className="bg-violet-500 px-8 py-4 rounded-2xl font-semibold"
                                >

                                    Open Assistant

                                </button>

                            </div>

                        </div>

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

                        <HealthScoreCard
                            score={dashboard.health_score || 0}
                        />

                        <div className="lg:col-span-2 bg-white rounded-[32px] p-6 shadow-sm">

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-2xl font-bold">

                                    AI Insights

                                </h2>

                                <button
                                    onClick={() => navigate("/analysis")}
                                    className="text-violet-600 font-semibold"
                                >

                                    Open Analysis

                                </button>

                            </div>

                            {
                                dashboard.latest_insights?.length > 0
                                    ? (
                                        <div className="space-y-4">

                                            {
                                                dashboard.latest_insights.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <div
                                                            key={index}
                                                            className="bg-violet-50 border border-violet-100 rounded-2xl p-5"
                                                        >

                                                            {item}

                                                        </div>

                                                    )
                                                )
                                            }

                                        </div>
                                    )
                                    : (
                                        <EmptyState
                                            title="No Insights"
                                            description="Upload reports to generate AI insights"
                                        />
                                    )
                            }

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-3 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-6 shadow-sm">

                            <h2 className="text-2xl font-bold">

                                Quick Actions

                            </h2>

                            <div className="space-y-4 mt-6">

                                <button
                                    onClick={() => navigate("/upload")}
                                    className="w-full h-14 bg-violet-600 text-white rounded-2xl font-semibold"
                                >

                                    Upload Report

                                </button>

                                <button
                                    onClick={() => navigate("/analysis")}
                                    className="w-full h-14 bg-blue-600 text-white rounded-2xl font-semibold"
                                >

                                    View Analysis

                                </button>

                                <button
                                    onClick={() => navigate("/chat")}
                                    className="w-full h-14 bg-green-600 text-white rounded-2xl font-semibold"
                                >

                                    Open AI Assistant

                                </button>

                            </div>

                        </div>

                        <AgentCard
                            title="Medical Agent"
                            description="Medical reasoning and healthcare guidance."
                            active={true}
                        />

                        <AgentCard
                            title="Report Agent"
                            description="Report analysis and health interpretation."
                            active={true}
                        />

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
                                                        className="border border-slate-200 rounded-2xl p-5 flex justify-between items-center hover:bg-slate-50"
                                                    >

                                                        <div>

                                                            <h3 className="font-semibold text-lg">

                                                                {report.report_name}

                                                            </h3>

                                                            <p className="text-slate-500 text-sm mt-1">

                                                                Medical Report
                                                            </p>

                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/report/${report.id}`
                                                                )
                                                            }
                                                            className="bg-slate-100 px-5 py-3 rounded-xl font-medium"
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
                                        description="Upload your first medical report"
                                    />
                                )
                        }

                    </div>

                    <div className="mt-8">

                        <RecentActivity
                            activities={
                                dashboard.activities || [
                                    "Dashboard accessed",
                                    "AI assistant available",
                                    "Healthcare analysis ready"
                                ]
                            }
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;