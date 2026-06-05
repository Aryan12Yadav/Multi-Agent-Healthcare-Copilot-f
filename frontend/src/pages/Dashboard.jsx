import {
    useEffect,
    useState
} from "react";

import api from "../api/api";

import Sidebar from "../components/Sidebar";
import MetricCard from "../components/MetricCard";
import Loading from "../components/Loading";

function Dashboard() {

    const [metrics,
        setMetrics] =
        useState(null);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard =
        async () => {

        try {

            const response =
                await api.get(
                    "/dashboard"
                );

            setMetrics(
                response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return <Loading />;
    }

    return (

        <div className="layout">

            <Sidebar />

            <div className="content">

                <h1>
                    Dashboard
                </h1>

                <div
                    className="metrics-grid"
                >

                    <MetricCard
                        title="Reports"
                        value={
                            metrics?.report_count
                        }
                    />

                    <MetricCard
                        title="Analyses"
                        value={
                            metrics?.analysis_count
                        }
                    />

                    <MetricCard
                        title="Health Score"
                        value={
                            metrics?.health_score
                        }
                    />

                </div>

                <div
                    className="dashboard-section"
                >

                    <h2>
                        Recent Reports
                    </h2>

                    {
                        metrics?.recent_reports
                        ?.length > 0
                        ? (

                            metrics.recent_reports
                            .map(
                                (
                                    report
                                ) => (

                                <div
                                    key={
                                        report.id
                                    }
                                    className="recent-report"
                                >

                                    {
                                        report.report_name
                                    }

                                </div>

                            ))
                        )
                        : (
                            <p>
                                No reports available
                            </p>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default Dashboard;