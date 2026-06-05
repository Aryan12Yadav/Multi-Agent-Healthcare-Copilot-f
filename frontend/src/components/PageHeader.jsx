function PageHeader({
    title,
    subtitle
}) {

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">

            <h1 className="text-4xl font-bold text-slate-900">

                {title}

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

                {subtitle}

            </p>

        </div>
    );
}

export default PageHeader;