
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

    const [search, setSearch] =
        useState("");

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedUserId, setSelectedUserId] =
        useState(null);

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

            await loadUsers();

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

            await loadUsers();

        } catch (error) {

            console.log(error);
        }
    }

    async function deleteUser() {

        try {

            await api.delete(
                `/admin/users/${selectedUserId}`
            );

            await loadUsers();

            setShowDeleteModal(
                false
            );

            setSelectedUserId(
                null
            );

        } catch (error) {

            console.log(error);
        }
    }

    const filteredUsers =
        users.filter(
            user =>
                user.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
                ||
                user.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

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

                    <div className="mb-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search user by name or email..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

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
                                    filteredUsers.map(
                                        (
                                            user
                                        ) => (

                                            <tr
                                                key={
                                                    user.id
                                                }
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

                                                <td>

                                                    {
                                                        user.is_blocked
                                                        ? (
                                                            <span
                                                                className="risk-high"
                                                            >
                                                                Blocked
                                                            </span>
                                                        )
                                                        : (
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
                                                        ? (
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
                                                        : (
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

                                                    {
                                                        user.role !== "admin"
                                                        &&
                                                        (
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => {

                                                                    setSelectedUserId(
                                                                        user.id
                                                                    );

                                                                    setShowDeleteModal(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        )
                                                    }

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

            {
                showDeleteModal && (

                    <div className="custom-modal-overlay">

                        <div className="custom-modal">

                            <h4>
                                Delete User
                            </h4>

                            <p>
                                Are you sure you want to delete this user?
                            </p>

                            <div className="modal-actions">

                                <button
                                    className="cancel-btn"
                                    onClick={() =>
                                        setShowDeleteModal(
                                            false
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete-confirm-btn"
                                    onClick={
                                        deleteUser
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );
}

export default AdminUsers;
 
