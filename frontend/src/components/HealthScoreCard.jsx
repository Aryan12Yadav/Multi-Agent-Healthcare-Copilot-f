function HealthScoreCard({
    score = 0
}) {

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-sm">

            <h2 className="text-2xl font-bold">

                Health Score

            </h2>

            <div className="flex justify-center mt-8">

                <div className="w-40 h-40 rounded-full border-[12px] border-green-500 flex items-center justify-center">

                    <div className="text-center">

                        <h3 className="text-5xl font-bold">

                            {score}

                        </h3>

                        <p className="text-slate-500">

                            Healthy

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default HealthScoreCard;