function InsightCard({
    title,
    description
}) {

    return (
        <div className="bg-violet-50 border border-violet-100 rounded-[28px] p-6 h-full">

            <h3 className="font-bold text-lg text-slate-900">

                {title}

            </h3>

            <p className="text-slate-600 mt-3 leading-7">

                {description}

            </p>

        </div>
    );
}

export default InsightCard;