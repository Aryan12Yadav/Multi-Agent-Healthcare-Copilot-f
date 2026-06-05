function PageContainer({
    title,
    subtitle,
    children
}) {

    return (
        <div className="flex-1">

            <div className="p-8">

                <div className="bg-white rounded-[32px] p-8 shadow-sm">

                    <h1 className="text-4xl font-bold">

                        {title}

                    </h1>

                    {
                        subtitle && (

                            <p className="text-slate-500 mt-3">

                                {subtitle}

                            </p>

                        )
                    }

                </div>

                <div className="mt-8">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default PageContainer;