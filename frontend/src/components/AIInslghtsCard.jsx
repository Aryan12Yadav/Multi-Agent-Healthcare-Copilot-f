function AIInsightsCard() {

    return (
        <div className="bg-white rounded-3xl p-6 border shadow-sm">

            <h2 className="text-xl font-bold mb-6">

                AI Insights

            </h2>

            <div className="space-y-4">

                <div className="bg-violet-50 p-4 rounded-2xl">

                    Hemoglobin slightly low

                </div>

                <div className="bg-green-50 p-4 rounded-2xl">

                    Liver function normal

                </div>

                <div className="bg-yellow-50 p-4 rounded-2xl">

                    Thyroid requires monitoring

                </div>

            </div>

            <button className="w-full mt-6 bg-violet-600 text-white py-4 rounded-2xl">

                Ask AI For More Insights

            </button>

        </div>
    );
}

export default AIInsightsCard;