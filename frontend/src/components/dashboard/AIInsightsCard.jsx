function AIInsightsCard() {

    return (

        <div className="bg-white rounded-2xl p-6 shadow h-full">

            <h2 className="font-semibold text-xl mb-6">

                AI Health Insights

            </h2>

            <div className="space-y-4">

                <div className="bg-purple-50 p-4 rounded-xl">

                    Hemoglobin below normal range

                </div>

                <div>

                    Platelet count slightly low

                </div>

                <div>

                    Liver function normal

                </div>

                <div>

                    Thyroid slightly high

                </div>

            </div>

            <button
                className="
                    mt-6
                    w-full
                    bg-purple-600
                    text-white
                    py-3
                    rounded-xl
                "
            >

                Ask AI For More Insights

            </button>

        </div>
    );
}

export default AIInsightsCard;