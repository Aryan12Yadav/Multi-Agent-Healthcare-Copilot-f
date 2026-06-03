import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/DashboardCard";

import QuickActions from "../components/QuickActions";


function DashboardPage() {

    return (

        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Welcome to MedSphere AI

                </h1>

                <div className="grid grid-cols-4 gap-6">

                    <DashboardCard
                        title="Reports"
                        value="12"
                    />

                    <DashboardCard
                        title="Analyses"
                        value="8"
                    />

                    <DashboardCard
                        title="Chats"
                        value="25"
                    />

                    <DashboardCard
                        title="Health Score"
                        value="84"
                    />

                </div>

                <div className="mt-8">

                    <QuickActions />

                </div>

            </div>

        </DashboardLayout>
    );
}

export default DashboardPage;