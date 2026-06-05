function SectionCard({
    title,
    children
}) {

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">

            <div className="pb-5 border-b border-slate-100 mb-6">

                <h2 className="text-2xl font-bold text-slate-900">

                    {title}

                </h2>

            </div>

            <div>

                {children}

            </div>

        </div>
    );
}

export default SectionCard;