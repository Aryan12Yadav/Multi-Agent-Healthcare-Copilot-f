import Header from "../components/Header";

import Sidebar from "../components/Sidebar";

import Footer from "../components/Footer";


function DashboardLayout({ children }) {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Header />

                {children}

                <Footer />

            </div>

        </div>
    );
}

export default DashboardLayout;