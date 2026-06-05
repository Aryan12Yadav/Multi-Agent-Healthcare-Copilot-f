function HealthMetricCard({
    title,
    value,
    status
}) {

    const getStatusColor = () => {

        if (
            status?.toLowerCase().includes("good") ||
            status?.toLowerCase().includes("normal") ||
            status?.toLowerCase().includes("low")
        ) {

            return "text-green-600";
        }

        if (
            status?.toLowerCase().includes("warning")
        ) {

            return "text-yellow-600";
        }

        return "text-red-600";
    };

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">

            <p className="text-slate-500 text-sm">

                {title}

            </p>

            <h2 className="text-4xl font-bold mt-3 text-slate-900">

                {value}

            </h2>

            <p className={`mt-4 font-semibold ${getStatusColor()}`}>

                {status}

            </p>

        </div>
    );
}

export default HealthMetricCard;