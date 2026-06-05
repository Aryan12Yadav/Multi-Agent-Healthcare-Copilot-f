function EmptyState({
    title = "No Data Found",
    description = "Nothing available right now"
}) {

    return (
        <div className="bg-white rounded-[32px] p-12 text-center">

            <div className="text-7xl">

                📄

            </div>

            <h2 className="text-3xl font-bold mt-6">

                {title}

            </h2>

            <p className="text-slate-500 mt-4">

                {description}

            </p>

        </div>
    );
}

export default EmptyState;