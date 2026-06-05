function AIInsightsCard() {

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 h-full">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">

                    AI Insights

                </h2>

                <span className="px-3 py-2 bg-violet-100 text-violet-700 rounded-xl text-sm font-semibold">

                    Live

                </span>

            </div>

            <div className="space-y-4">

                <div className="bg-violet-50 border border-violet-100 p-4 rounded-2xl">

                    Hemoglobin slightly low

                </div>

                <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">

                    Liver function normal

                </div>

                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-2xl">

                    Thyroid requires monitoring

                </div>

            </div>

            <button className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-2xl font-semibold transition-all">

                Ask AI For More Insights

            </button>

        </div>
    );
}

export default AIInsightsCard;