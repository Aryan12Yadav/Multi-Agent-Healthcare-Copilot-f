function HealthSummaryCard() {

    return (

        <div className="bg-white rounded-2xl shadow p-6 h-full">

            <h2 className="text-xl font-semibold mb-6">

                Health Summary

            </h2>

            <div className="flex justify-center">

                <div className="h-36 w-36 rounded-full border-8 border-green-500 flex items-center justify-center">

                    <div className="text-center">

                        <h1 className="text-4xl font-bold">

                            78

                        </h1>

                        <p>

                            Good

                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6 space-y-3">

                <p>Vital Signs : Good</p>

                <p>Blood Parameters : Attention</p>

                <p>Liver Function : Good</p>

                <p>Kidney Function : Good</p>

            </div>

        </div>

    );
}

export default HealthSummaryCard;