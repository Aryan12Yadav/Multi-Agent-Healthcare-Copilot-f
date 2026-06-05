import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout({
    children
}) {

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                {children}

            </div>

        </div>
    );
}

export default DashboardLayout;