import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

import { getDashboardStats } from "../services/userService";

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

            const response =
                await getDashboardStats();

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
                description="Fetching dashboard data"
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
                title="No Data Available"
                description="Dashboard information unavailable"
            />
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 overflow-x-hidden">

                <Header />

                <div className="p-8">

                    <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-[32px] p-10 text-white">

                        <h1 className="text-5xl font-bold">

                            Welcome Back

                        </h1>

                        <p className="mt-4 text-violet-100">

                            AI Powered Healthcare Intelligence Platform

                        </p>

                        <div className="flex gap-4 mt-8">

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

                    <div className="bg-white rounded-[32px] p-6 shadow-sm mt-8">

                        <h2 className="text-2xl font-bold mb-6">

                            AI Insights

                        </h2>

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
                                                        className="bg-violet-50 rounded-2xl p-4"
                                                    >

                                                        {item}

                                                    </div>

                                                )
                                            )
                                        }

                                    </div>
                                )
                                : (
                                    <p className="text-slate-500">

                                        No insights available

                                    </p>
                                )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;