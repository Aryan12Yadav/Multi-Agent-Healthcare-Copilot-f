function StatsCard({ title, value, icon }) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex items-center justify-between">

                <h3 className="text-gray-500">

                    {title}

                </h3>

                {icon}

            </div>

            <h1 className="text-4xl font-bold mt-4">

                {value}

            </h1>

        </div>
    );
}

export default StatsCard;