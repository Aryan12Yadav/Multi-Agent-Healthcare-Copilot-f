import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { logoutUser } from "../services/auth";

function ProfilePage() {

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <div className="bg-white rounded-[32px] p-10 shadow-sm">

                        <div className="flex items-center gap-8">

                            <div className="w-32 h-32 rounded-full bg-violet-600 text-white flex items-center justify-center text-5xl font-bold">

                                A

                            </div>

                            <div>

                                <h1 className="text-5xl font-bold">

                                    Aryan

                                </h1>

                                <p className="text-slate-500 text-xl mt-3">

                                    Healthcare Platform User

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-3xl font-bold">

                                Profile Information

                            </h2>

                            <div className="space-y-5 mt-8">

                                <input
                                    defaultValue="Aryan"
                                    className="w-full h-14 border rounded-2xl px-5"
                                />

                                <input
                                    defaultValue="aryan@gmail.com"
                                    className="w-full h-14 border rounded-2xl px-5"
                                />

                                <button className="bg-violet-600 text-white px-8 py-4 rounded-2xl">

                                    Save Profile

                                </button>

                            </div>

                        </div>

                        <div className="bg-white rounded-[32px] p-8 shadow-sm">

                            <h2 className="text-3xl font-bold">

                                Account Actions

                            </h2>

                            <div className="space-y-4 mt-8">

                                <button className="w-full h-14 bg-blue-600 text-white rounded-2xl">

                                    Export Reports

                                </button>

                                <button className="w-full h-14 bg-green-600 text-white rounded-2xl">

                                    Download History

                                </button>

                                <button
                                    onClick={logoutUser}
                                    className="w-full h-14 bg-red-500 text-white rounded-2xl"
                                >

                                    Logout

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProfilePage;