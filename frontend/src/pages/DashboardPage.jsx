import { useEffect } from "react";
import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/DashboardCard";
import QuickActions from "../components/QuickActions";
import RecentReports from "../components/RecentReports";

import { getDashboardMetrics } from "../services/dashboardService";

import DashboardStats from "../components/dashboard/DashboardStats";
import UploadReportCard from "../components/dashboard/UploadReportCard";
import HealthSummaryCard from "../components/dashboard/HealthSummaryCard";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";


function DashboardPage() {

    const [metrics, setMetrics] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async() => {

        try {

            const response = await getDashboardMetrics();

            setMetrics(response);

        } catch(error) {

            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <div className="p-8 bg-slate-50 min-h-screen">

                <h1 className="text-4xl font-bold mb-2">
                    Hello Aryan
                </h1>

                <p className="text-gray-500 mb-8">
                    Here's your health overview
                </p>

                <div className="grid grid-cols-5 gap-6">

                    <div className="col-span-4">

                        <DashboardStats metrics={metrics} />

                    </div>

                    <div>

                        <UploadReportCard />

                    </div>

                </div>

                <div className="grid grid-cols-4 gap-6 mt-8">

                    <DashboardCard
                        title="Reports"
                        value={metrics?.report_count || 0}
                    />

                    <DashboardCard
                        title="Analysis"
                        value={metrics?.analysis_count || 0}
                    />

                    <DashboardCard
                        title="Chats"
                        value={metrics?.chat_count || 0}
                    />

                    <DashboardCard
                        title="Health Score"
                        value={metrics?.health_score || 0}
                    />

                </div>

                <div className="mt-8">

                    <QuickActions />

                </div>

                <div className="grid grid-cols-3 gap-6 mt-8">

                    <div>

                        <RecentReports />

                    </div>

                    <div>

                        <HealthSummaryCard />

                    </div>

                    <div>

                        <AIInsightsCard />

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default DashboardPage;