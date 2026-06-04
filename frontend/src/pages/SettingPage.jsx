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

                    <div className="bg-white rounded-[32px] p-8 shadow-sm">

                        <h1 className="text-4xl font-bold">

                            Settings

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Manage your application preferences
                        </p>

                    </div>

                    <div className="bg-white rounded-[32px] p-8 shadow-sm mt-6">

                        <h2 className="text-2xl font-bold mb-8">

                            Notification Settings

                        </h2>

                        <div className="space-y-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <h3 className="font-semibold">

                                        Push Notifications

                                    </h3>

                                    <p className="text-slate-500">

                                        Receive healthcare alerts
                                    </p>

                                </div>

                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                />

                            </div>

                            <div className="flex justify-between items-center">

                                <div>

                                    <h3 className="font-semibold">

                                        Email Alerts

                                    </h3>

                                    <p className="text-slate-500">

                                        Analysis and report updates
                                    </p>

                                </div>

                                <input
                                    type="checkbox"
                                    checked={emailAlerts}
                                    onChange={() => setEmailAlerts(!emailAlerts)}
                                />

                            </div>

                            <div className="flex justify-between items-center">

                                <div>

                                    <h3 className="font-semibold">

                                        Dark Mode

                                    </h3>

                                    <p className="text-slate-500">

                                        Switch theme appearance
                                    </p>

                                </div>

                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-[32px] p-8 shadow-sm mt-6">

                        <h2 className="text-2xl font-bold mb-8">

                            Privacy Settings

                        </h2>

                        <div className="space-y-4">

                            <button className="w-full h-14 bg-slate-100 rounded-2xl text-left px-5">

                                Download My Data

                            </button>

                            <button className="w-full h-14 bg-slate-100 rounded-2xl text-left px-5">

                                Export Reports

                            </button>

                            <button className="w-full h-14 bg-red-500 text-white rounded-2xl">

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