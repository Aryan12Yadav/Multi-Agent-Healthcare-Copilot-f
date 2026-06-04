import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DashboardLayout({ children }) {

    return (

        <div className="flex bg-slate-50">

            <Sidebar />

            <div className="flex-1 min-h-screen">

                <Header />

                {children}

                <Footer />

            </div>

        </div>
    );
}

export default DashboardLayout;