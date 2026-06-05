function StatCard({
    title,
    value
}) {

    return (
        <div
            className="
                bg-white
                rounded-[32px]
                p-6
                shadow-sm
                border
                border-slate-100
            "
        >

            <p className="text-slate-500 text-sm">

                {title}

            </p>

            <h2 className="text-5xl font-bold mt-4">

                {value}

            </h2>

        </div>
    );
}

export default StatCard;