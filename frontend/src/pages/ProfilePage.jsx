import { useEffect } from "react";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import { getProfile } from "../services/userService";

function ProfilePage() {

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async() => {

        try {

            const response = await getProfile();

            setProfile(
                response
            );

        } catch(error) {

            console.log(error);

            setError(true);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (
            <LoadingSpinner
                title="Loading Profile"
                description="Fetching user information"
            />
        );
    }

    if (error) {

        return (
            <ErrorState
                title="Profile Error"
                description="Unable to load profile"
            />
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <div className="bg-white rounded-[32px] shadow-sm p-8">

                        <div className="flex items-center gap-6">

                            <div className="w-24 h-24 rounded-full bg-violet-600 text-white flex items-center justify-center text-4xl font-bold">

                                {
                                    profile?.full_name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "A"
                                }

                            </div>

                            <div>

                                <h1 className="text-4xl font-bold">

                                    {
                                        profile?.full_name ||
                                        "Aryan"
                                    }

                                </h1>

                                <p className="text-slate-500 mt-2">

                                    {
                                        profile?.email ||
                                        "user@email.com"
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] shadow-sm p-8">

                            <h2 className="text-2xl font-bold mb-6">

                                Personal Information

                            </h2>

                            <div className="space-y-6">

                                <div>

                                    <p className="text-slate-500">

                                        Full Name

                                    </p>

                                    <p className="font-semibold mt-1">

                                        {
                                            profile?.full_name ||
                                            "-"
                                        }

                                    </p>

                                </div>

                                <div>

                                    <p className="text-slate-500">

                                        Email

                                    </p>

                                    <p className="font-semibold mt-1">

                                        {
                                            profile?.email ||
                                            "-"
                                        }

                                    </p>

                                </div>

                                <div>

                                    <p className="text-slate-500">

                                        User ID

                                    </p>

                                    <p className="font-semibold mt-1">

                                        {
                                            profile?.id ||
                                            "-"
                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="bg-white rounded-[32px] shadow-sm p-8">

                            <h2 className="text-2xl font-bold mb-6">

                                Health Summary

                            </h2>

                            <div className="space-y-4">

                                <div className="bg-green-50 rounded-2xl p-4">

                                    Health Score: 89

                                </div>

                                <div className="bg-blue-50 rounded-2xl p-4">

                                    Reports Uploaded: 12

                                </div>

                                <div className="bg-violet-50 rounded-2xl p-4">

                                    AI Chats: 52

                                </div>

                                <div className="bg-orange-50 rounded-2xl p-4">

                                    Active Status
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-[32px] shadow-sm p-8 mt-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Account Settings

                        </h2>

                        <div className="grid lg:grid-cols-3 gap-4">

                            <button className="h-14 rounded-2xl bg-violet-600 text-white">

                                Edit Profile

                            </button>

                            <button className="h-14 rounded-2xl bg-blue-600 text-white">

                                Change Password

                            </button>

                            <button className="h-14 rounded-2xl bg-red-500 text-white">

                                Delete Account

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProfilePage;