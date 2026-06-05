function HealthSummaryCard() {

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">

            <h2 className="text-2xl font-bold mb-6">

                Health Summary

            </h2>

            <div className="flex justify-center">

                <div className="w-40 h-40 rounded-full border-[12px] border-green-500 flex items-center justify-center">

                    <div className="text-center">

                        <h3 className="text-5xl font-bold text-slate-900">

                            89

                        </h3>

                        <p className="text-slate-500 mt-1">

                            Good

                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-8 space-y-4">

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Vital Signs

                    </span>

                    <span className="font-semibold text-green-600">

                        Good

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Liver Function

                    </span>

                    <span className="font-semibold text-green-600">

                        Good

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Heart Risk

                    </span>

                    <span className="font-semibold text-green-600">

                        Low

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Kidney Function

                    </span>

                    <span className="font-semibold text-green-600">

                        Good

                    </span>

                </div>

            </div>

        </div>
    );
}

export default HealthSummaryCard;