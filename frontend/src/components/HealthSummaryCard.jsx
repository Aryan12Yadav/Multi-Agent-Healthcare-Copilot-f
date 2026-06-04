function HealthSummaryCard() {

    return (
        <div className="bg-white rounded-3xl p-6 border shadow-sm">

            <h2 className="text-xl font-bold mb-6">

                Health Summary

            </h2>

            <div className="flex justify-center">

                <div className="w-40 h-40 rounded-full border-[12px] border-green-500 flex items-center justify-center">

                    <div className="text-center">

                        <h3 className="text-4xl font-bold">

                            89

                        </h3>

                        <p>

                            Good

                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-8 space-y-3">

                <p>Vital Signs : Good</p>

                <p>Liver Function : Good</p>

                <p>Heart Risk : Low</p>

                <p>Kidney Function : Good</p>

            </div>

        </div>
    );
}

export default HealthSummaryCard;