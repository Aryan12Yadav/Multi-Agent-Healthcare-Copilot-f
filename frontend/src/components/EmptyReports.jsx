function EmptyState({
    title = "No Data Found",
    description = "Nothing available right now"
}) {

    return (
        <div className="bg-white rounded-[32px] p-12 shadow-sm">

            <div className="flex flex-col items-center text-center">

                <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center">

                    <span className="text-5xl">

                        📄

                    </span>

                </div>

                <h2 className="text-3xl font-bold text-slate-900 mt-8">

                    {title}

                </h2>

                <p className="text-slate-500 mt-4 max-w-lg">

                    {description}

                </p>

            </div>

        </div>
    );
}

export default EmptyState;