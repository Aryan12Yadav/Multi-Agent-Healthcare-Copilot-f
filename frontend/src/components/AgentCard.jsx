function AgentCard({
    title,
    description,
    active = true
}) {

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 h-full">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">

                    {title}

                </h2>

                <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                        active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >

                    {
                        active
                            ? "Online"
                            : "Offline"
                    }

                </span>

            </div>

            <p className="text-slate-500 mt-4 leading-7">

                {description}

            </p>

            <div className="mt-6 pt-4 border-t border-slate-100">

                <p className="text-sm text-slate-400">

                    AI Agent Status

                </p>

            </div>

        </div>
    );
}

export default AgentCard;