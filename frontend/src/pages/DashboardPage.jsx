import { useEffect } from "react";
import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/DashboardCard";

import QuickActions from "../components/QuickActions";

import RecentReports from "../components/RecentReports";

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

        }

        catch(error) {

            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Dashboard
                </h1>

                <div className="grid grid-cols-4 gap-6">

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

                <div className="mt-8">

                    <RecentReports />

                </div>

            </div>

        </DashboardLayout>
    );
}

export default DashboardPage;