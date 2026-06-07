import { useEffect } from "react";
import { useState } from "react";

import api from "../../services/apiService";

import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";

function AdminDashboard() {

    const [stats, setStats] =
        useState({});

    useEffect(() => {

        loadStats();

    }, []);

    async function loadStats() {

        try {

            const response =
                await api.get(
                    "/admin/stats"
                );

            setStats(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    }

    return (

        <div className="app-layout">

            <AdminSidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-container">

                    <h2>
                        Admin Dashboard
                    </h2>

                    <div className="row mt-4">

                        <div className="col-md-4">

                            <div className="dashboard-card">

                                <h3>
                                    {
                                        stats.total_users || 0
                                    }
                                </h3>

                                <p>
                                    Total Users
                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-card">

                                <h3>
                                    {
                                        stats.blocked_users || 0
                                    }
                                </h3>

                                <p>
                                    Blocked Users
                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-card">

                                <h3>
                                    {
                                        stats.admin_users || 0
                                    }
                                </h3>

                                <p>
                                    Admin Users
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AdminDashboard;