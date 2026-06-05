import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function SettingsPage() {

    const [notifications, setNotifications] = useState(true);

    const [emailAlerts, setEmailAlerts] = useState(true);

    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <div className="bg-white rounded-[32px] shadow-sm p-8">

                        <h1 className="text-4xl font-bold">

                            Settings

                        </h1>

                        <p className="text-slate-500 mt-3">

                            Manage your healthcare platform preferences
                        </p>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] shadow-sm p-8">

                            <h2 className="text-2xl font-bold mb-8">

                                Notifications
                            </h2>

                            <div className="space-y-6">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h3 className="font-semibold">

                                            Push Notifications

                                        </h3>

                                        <p className="text-slate-500 text-sm mt-1">

                                            Receive application notifications
                                        </p>

                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={notifications}
                                        onChange={() =>
                                            setNotifications(
                                                !notifications
                                            )
                                        }
                                        className="w-6 h-6"
                                    />

                                </div>

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h3 className="font-semibold">

                                            Email Alerts

                                        </h3>

                                        <p className="text-slate-500 text-sm mt-1">

                                            Medical report updates via email
                                        </p>

                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={emailAlerts}
                                        onChange={() =>
                                            setEmailAlerts(
                                                !emailAlerts
                                            )
                                        }
                                        className="w-6 h-6"
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="bg-white rounded-[32px] shadow-sm p-8">

                            <h2 className="text-2xl font-bold mb-8">

                                Appearance
                            </h2>

                            <div className="space-y-6">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h3 className="font-semibold">

                                            Dark Mode

                                        </h3>

                                        <p className="text-slate-500 text-sm mt-1">

                                            Switch application theme
                                        </p>

                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={() =>
                                            setDarkMode(
                                                !darkMode
                                            )
                                        }
                                        className="w-6 h-6"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-[32px] shadow-sm p-8 mt-8">

                        <h2 className="text-2xl font-bold mb-8">

                            Account Security
                        </h2>

                        <div className="grid lg:grid-cols-3 gap-4">

                            <button className="h-14 bg-violet-600 text-white rounded-2xl">

                                Change Password

                            </button>

                            <button className="h-14 bg-blue-600 text-white rounded-2xl">

                                Download Data

                            </button>

                            <button className="h-14 bg-red-500 text-white rounded-2xl">

                                Delete Account

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SettingsPage;