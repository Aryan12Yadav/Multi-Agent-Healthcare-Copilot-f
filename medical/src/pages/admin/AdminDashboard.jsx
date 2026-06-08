import { useEffect } from "react";
import { useState } from "react";

import api from "../../services/apiService";

import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";

function AdminDashboard() {

    const [stats, setStats] =
        useState({});

    const [recentUsers, setRecentUsers] =
    useState([]);

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

            const usersResponse =
                await api.get(
                    "/admin/recent-users"
                );

            setRecentUsers(
                usersResponse.data.users || []
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

                    <div className="page-header">

                        <div>

                            <h2>
                                Admin Dashboard
                            </h2>

                            <p>
                                Monitor users, reports and platform activity
                            </p>

                        </div>

                    </div>

                    <div className="row g-4 mt-3">

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

                        <div className="col-md-4">

                            <div className="dashboard-card">

                                <h3>
                                    {
                                        stats.total_reports || 0
                                    }
                                </h3>

                                <p>
                                    Total Reports
                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-card">

                                <h3>
                                    {
                                        stats.total_analyses || 0
                                    }
                                </h3>

                                <p>
                                    AI Analyses
                                </p>

                            </div>

                        </div>

                            <div className="admin-table-card mt-4">

                            <h4>
                                Recent Users
                            </h4>

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Role</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        recentUsers.map(
                                            (user) => (

                                                <tr
                                                    key={user.id}
                                                >

                                                    <td>
                                                        {user.id}
                                                    </td>

                                                    <td>
                                                        {user.name}
                                                    </td>

                                                    <td>
                                                        {user.email}
                                                    </td>

                                                    <td>
                                                        {user.role}
                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AdminDashboard;