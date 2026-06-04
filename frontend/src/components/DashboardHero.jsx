function DashboardHero() {

    return (

        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

            <h1 className="text-5xl font-bold">

                Welcome Back Aryan
            </h1>

            <p className="mt-4 text-lg">

                Analyze reports, monitor health and chat with AI.
            </p>

            <div className="flex gap-4 mt-8">

                <button className="bg-white text-violet-600 px-6 py-3 rounded-xl font-semibold">

                    Upload Report
                </button>

                <button className="bg-violet-500 px-6 py-3 rounded-xl">

                    Ask AI
                </button>

            </div>

        </div>
    );
}

export default DashboardHero;




