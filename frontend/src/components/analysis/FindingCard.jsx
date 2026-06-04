function FindingCard({ title, status }) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between">

                <h3 className="font-semibold">

                    {title}

                </h3>

                <span
                    className={
                        status === "Abnormal"
                            ? "text-red-500"
                            : "text-green-500"
                    }
                >

                    {status}

                </span>

            </div>

        </div>

    );
}

export default FindingCard;