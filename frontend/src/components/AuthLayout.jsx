function AuthLayout({ children }) {

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="grid lg:grid-cols-2 min-h-screen">

                <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-800">

                    <div className="absolute top-0 left-0 w-full h-full bg-black/10" />

                    <div className="relative z-10 flex flex-col justify-center px-20 text-white w-full">

                        <div>

                            <h1 className="text-7xl font-bold leading-tight">

                                MedSphere
                                <br />
                                AI

                            </h1>

                            <p className="mt-8 text-2xl text-violet-100 leading-10 max-w-xl">

                                Intelligent healthcare platform for
                                report analysis, AI medical guidance,
                                health monitoring and patient insights.

                            </p>

                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-20">

                            <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                                <h2 className="text-4xl font-bold">

                                    10K+

                                </h2>

                                <p className="mt-2 text-violet-100">

                                    Reports

                                </p>

                            </div>

                            <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                                <h2 className="text-4xl font-bold">

                                    95%

                                </h2>

                                <p className="mt-2 text-violet-100">

                                    Accuracy

                                </p>

                            </div>

                            <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                                <h2 className="text-4xl font-bold">

                                    24/7

                                </h2>

                                <p className="mt-2 text-violet-100">

                                    AI Support

                                </p>

                            </div>

                        </div>

                        <div className="mt-16 bg-white/10 backdrop-blur rounded-[32px] p-8">

                            <h3 className="text-2xl font-semibold">

                                Smart Healthcare Intelligence

                            </h3>

                            <p className="mt-4 text-violet-100 leading-8">

                                Upload medical reports, receive AI-powered
                                insights, monitor health trends and chat
                                with an intelligent healthcare assistant.

                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex items-center justify-center p-6 lg:p-12">

                    <div className="w-full max-w-md">

                        {children}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AuthLayout;