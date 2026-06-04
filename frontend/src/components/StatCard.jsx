function StatCard({ title, value }) {

    const getColor = () => {

        if (title === "Health Score") {

            return "text-green-600";
        }

        if (title === "Reports") {

            return "text-violet-600";
        }

        if (title === "Analysis") {

            return "text-blue-600";
        }

        return "text-orange-600";
    };

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-slate-500 font-medium">

                        {title}

                    </p>

                    <h2 className={`text-5xl font-bold mt-4 ${getColor()}`}>

                        {value}

                    </h2>

                </div>

                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">

                    📈

                </div>

            </div>

            <div className="mt-6 flex items-center gap-2">

                <span className="text-green-500">

                    ↑ 12%

                </span>

                <span className="text-slate-400 text-sm">

                    vs last month

                </span>

            </div>

        </div>
    );
}

export default StatCard;