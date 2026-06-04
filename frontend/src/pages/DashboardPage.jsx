import { useEffect } from "react";
import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHero from "../components/DashboardHero";

import DashboardStats from "../components/dashboard/DashboardStats";

import UploadReportCard from "../components/dashboard/UploadReportCard";

import HealthSummaryCard from "../components/dashboard/HealthSummaryCard";

import AIInsightsCard from "../components/dashboard/AIInsightsCard";

import { getDashboardMetrics } from "../services/dashboardService";


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

                <DashboardHero />

                <div className="mt-8">

                    <DashboardStats metrics={metrics} />

                </div>

                <div className="grid grid-cols-3 gap-6 mt-8">

                    <UploadReportCard />

                    <HealthSummaryCard />

                    <AIInsightsCard />

                </div>

            </div>

        </DashboardLayout>
    );
}

export default DashboardPage;