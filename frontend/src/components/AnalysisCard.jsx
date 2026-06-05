function AnalysisCard({
    title,
    value,
    color = "violet"
}) {

    const colors = {
        violet: "bg-violet-50 text-violet-700",
        green: "bg-green-50 text-green-700",
        red: "bg-red-50 text-red-700",
        blue: "bg-blue-50 text-blue-700"
    };

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm">

            <p className="text-slate-500">

                {title}

            </p>

            <div
                className={`mt-5 p-4 rounded-2xl font-bold text-3xl ${
                    colors[color]
                }`}
            >

                {value}

            </div>

        </div>
    );
}

export default AnalysisCard;