import { useEffect } from "react";
import { useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import api from "../services/apiService";

function Dashboard() {

    const [loading, setLoading] =
        useState(true);

    const [dashboard, setDashboard] =
        useState({
            total_reports: 0,
            medical_reports: 0,
            average_health_score: 0,
            latest_health_score: 0,
            high_risk_reports: 0
        });

    const [trend, setTrend] =
        useState({});

    const [alerts, setAlerts] =
        useState([]);

    const [userName, setUserName] =
        useState("User");

    const [chartData, setChartData] =
        useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const storedUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                );

            if (storedUser?.name) {

                setUserName(
                    storedUser.name
                );
            }

            const dashboardResponse =
                await api.get(
                    "/dashboard"
                );

            const trendResponse =
                await api.get(
                    "/dashboard/health-trends"
                );

            const alertResponse =
                await api.get(
                    "/dashboard/alerts"
                );

            setDashboard(
                dashboardResponse.data
            );

            setTrend(
                trendResponse.data.trend || {}
            );

            setAlerts(
                alertResponse.data.alerts || []
            );

            const trendData =
                trendResponse.data.trend || {};

            setChartData([
                {
                    name: "First",
                    score:
                        trendData.first_score || 0
                },
                {
                    name: "Latest",
                    score:
                        trendData.latest_score || 0
                }
            ]);

        } catch (error) {

            console.log(
                error
            );

        } finally {

            setLoading(
                false
            );
        }
    }

    function getHealthStatus() {

        const score =
            dashboard.latest_health_score;

        if (score >= 80) {

            return "Excellent";
        }

        if (score >= 50) {

            return "Moderate";
        }

        return "Needs Attention";
    }

    if (loading) {

        return <Loader />;
    }

    return (

        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-container">

                    <div className="hero-banner">

                        <div>

                            <h2>
                                Welcome, {userName}
                            </h2>

                            <p>
                                AI Powered Healthcare Intelligence Platform
                            </p>

                        </div>

                        <div className="hero-score">

                            <h1>
                                {
                                    dashboard.latest_health_score
                                }
                            </h1>

                            <span>
                                Health Score
                            </span>

                        </div>

                    </div>

                    <div className="row g-3">

                        <div className="col-md-3">

                            <div className="dashboard-card">

                                <i className="bi bi-file-earmark-medical"></i>

                                <h3>
                                    {
                                        dashboard.total_reports
                                    }
                                </h3>

                                <p>
                                    Total Reports
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card">

                                <i className="bi bi-heart-pulse"></i>

                                <h3>
                                    {
                                        dashboard.medical_reports
                                    }
                                </h3>

                                <p>
                                    Medical Reports
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card">

                                <i className="bi bi-activity"></i>

                                <h3>
                                    {
                                        dashboard.average_health_score
                                    }
                                </h3>

                                <p>
                                    Average Score
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card">

                                <i className="bi bi-exclamation-triangle"></i>

                                <h3>
                                    {
                                        dashboard.high_risk_reports
                                    }
                                </h3>

                                <p>
                                    High Risk Reports
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="row mt-4">

                        <div className="col-lg-8">

                            <div className="stat-card">

                                <h4>
                                    Health Trend Analysis
                                </h4>

                                <hr />

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <LineChart
                                        data={chartData}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />

                                        <XAxis
                                            dataKey="name"
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#4f46e5"
                                            strokeWidth={3}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                                <div className="mt-3">

                                    <h5>
                                        Trend:
                                        {" "}
                                        {
                                            trend.trend ||
                                            "Insufficient Data"
                                        }
                                    </h5>

                                    <p>
                                        Change:
                                        {" "}
                                        {
                                            trend.change ?? 0
                                        }
                                    </p>

                                    <p>
                                        First Score:
                                        {" "}
                                        {
                                            trend.first_score ?? 0
                                        }
                                    </p>

                                    <p>
                                        Latest Score:
                                        {" "}
                                        {
                                            trend.latest_score ?? 0
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="stat-card score-card">

                                <h5>
                                    Current Health Status
                                </h5>

                                <div className="score-circle">

                                    <h1>
                                        {
                                            dashboard.latest_health_score
                                        }
                                    </h1>

                                </div>

                                <p>
                                    {
                                        getHealthStatus()
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="stat-card mt-4">

                        <h4>
                            Active Alerts
                        </h4>

                        <hr />

                        {
                            alerts.length === 0
                            ? (

                                <div className="no-alert">

                                    <i className="bi bi-shield-check"></i>

                                    <p>
                                        No Active Alerts
                                    </p>

                                </div>

                            )
                            : (

                                alerts.map(
                                    (
                                        alert,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="alert alert-danger"
                                        >

                                            Report #
                                            {
                                                alert.report_id
                                            }

                                            {" - "}

                                            {
                                                alert.message
                                            }

                                        </div>

                                    )
                                )

                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;