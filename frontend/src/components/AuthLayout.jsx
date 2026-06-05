function AuthLayout({ children }) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700">

            <div className="container mx-auto min-h-screen flex items-center justify-center px-6">

                <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl">

                    <div className="hidden lg:block text-white">

                        <div className="max-w-xl">

                            <h1 className="text-7xl font-black leading-tight">

                                MedSphere AI

                            </h1>

                            <p className="text-2xl mt-8 text-violet-100 leading-10">

                                AI Powered Healthcare Platform
                                for Medical Report Analysis,
                                Smart Recommendations,
                                Health Monitoring and
                                Intelligent Medical Assistance.

                            </p>

                            <div className="grid grid-cols-2 gap-6 mt-12">

                                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                                    <h2 className="text-4xl font-bold">

                                        AI

                                    </h2>

                                    <p className="mt-3">

                                        Report Analysis
                                    </p>

                                </div>

                                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                                    <h2 className="text-4xl font-bold">

                                        24/7

                                    </h2>

                                    <p className="mt-3">

                                        Medical Assistant
                                    </p>

                                </div>

                                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                                    <h2 className="text-4xl font-bold">

                                        Smart

                                    </h2>

                                    <p className="mt-3">

                                        Recommendations
                                    </p>

                                </div>

                                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                                    <h2 className="text-4xl font-bold">

                                        Live

                                    </h2>

                                    <p className="mt-3">

                                        Health Tracking
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="w-full max-w-xl mx-auto">

                        {children}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AuthLayout;