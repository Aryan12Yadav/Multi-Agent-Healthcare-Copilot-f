function LoadingSpinner({
    title = "Loading...",
    description = "Please wait"
}) {

    return (
        <div className="min-h-[400px] flex items-center justify-center">

            <div className="text-center">

                <div className="mx-auto w-20 h-20 border-[6px] border-slate-200 border-t-violet-600 rounded-full animate-spin" />

                <h2 className="text-3xl font-bold mt-8 text-slate-900">

                    {title}

                </h2>

                <p className="text-slate-500 mt-3 text-lg">

                    {description}

                </p>

            </div>

        </div>
    );
}

export default LoadingSpinner;