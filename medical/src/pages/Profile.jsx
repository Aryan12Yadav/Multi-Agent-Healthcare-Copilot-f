import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Profile() {

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [user, setUser] =
        useState({
            id: "",
            name: "",
            email: ""
        });

    useEffect(() => {

        loadUser();

    }, []);

    function loadUser() {

        try {

            const storedUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    ) || "{}"
                );

            setUser({
                id:
                storedUser.id || "",
                name:
                storedUser.name || "User",
                email:
                storedUser.email || "-"
            });

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    function logout() {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/");
    }

    if (loading) {

        return <Loader />;
    }

    return (

        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-container">

                    <div className="profile-card">

                        <div className="profile-avatar">

                            {
                                user.name
                                .charAt(0)
                                .toUpperCase()
                            }

                        </div>

                        <h2>

                            {user.name}

                        </h2>

                        <p>

                            MedSphere AI User

                        </p>

                    </div>

                    <div className="profile-info-card">

                        <h4>

                            Account Information

                        </h4>

                        <hr />

                        <div className="profile-info-row">

                            <span>

                                User ID

                            </span>

                            <strong>

                                {user.id}

                            </strong>

                        </div>

                        <div className="profile-info-row">

                            <span>

                                Full Name

                            </span>

                            <strong>

                                {user.name}

                            </strong>

                        </div>

                        <div className="profile-info-row">

                            <span>

                                Email Address

                            </span>

                            <strong>

                                {user.email}

                            </strong>

                        </div>

                    </div>

                    <div className="profile-info-card">

                        <h4>

                            Account Actions

                        </h4>

                        <hr />

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >

                            Logout

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Profile;