import { useEffect } from "react";
import { useState } from "react";

import api from "../../services/apiService";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import Loader from "../../components/Loader";

function AdminUsers() {

    const [loading, setLoading] =
        useState(true);

    const [users, setUsers] =
        useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        try {

            const response =
                await api.get(
                    "/admin/users"
                );

            setUsers(
                response.data.users || []
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    async function blockUser(
        userId
    ) {

        try {

            await api.put(
                `/admin/users/${userId}/block`
            );

            loadUsers();

        } catch (error) {

            console.log(error);
        }
    }

    async function unblockUser(
        userId
    ) {

        try {

            await api.put(
                `/admin/users/${userId}/unblock`
            );

            loadUsers();

        } catch (error) {

            console.log(error);
        }
    }

    async function deleteUser(
        userId
    ) {

        const confirmed =
            window.confirm(
                "Delete this user?"
            );

        if (!confirmed) {

            return;
        }

        try {

            await api.delete(
                `/admin/users/${userId}`
            );

            setUsers(
                users.filter(
                    user =>
                    user.id !== userId
                )
            );

        } catch (error) {

            console.log(error);
        }
    }

    if (loading) {

        return <Loader />;
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
                                User Management
                            </h2>

                            <p>
                                Manage platform users
                            </p>

                        </div>

                    </div>

                    <div className="report-table-card">

                        <table
                            className="table table-hover"
                        >

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    users.map(
                                        (
                                            user
                                        ) => (

                                            <tr
                                                key={
                                                    user.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        user.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.email
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.role
                                                    }
                                                </td>

                                                <td>

                                                    {
                                                        user.is_blocked
                                                        ?
                                                        (
                                                            <span
                                                                className="risk-high"
                                                            >
                                                                Blocked
                                                            </span>
                                                        )
                                                        :
                                                        (
                                                            <span
                                                                className="risk-low"
                                                            >
                                                                Active
                                                            </span>
                                                        )
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        user.is_blocked
                                                        ?
                                                        (
                                                            <button
                                                                className="btn btn-success btn-sm me-2"
                                                                onClick={() =>
                                                                    unblockUser(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Unblock
                                                            </button>
                                                        )
                                                        :
                                                        (
                                                            <button
                                                                className="btn btn-warning btn-sm me-2"
                                                                onClick={() =>
                                                                    blockUser(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Block
                                                            </button>
                                                        )
                                                    }

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            deleteUser(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

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

    );
}

export default AdminUsers;