function LoadingSpinner({
    title = "Loading...",
    description = "Please wait"
}) {

    return (
        <div className="flex flex-col items-center justify-center py-20">

            <div className="w-16 h-16 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin" />

            <h2 className="text-2xl font-bold mt-6">

                {title}

            </h2>

            <p className="text-slate-500 mt-2">

                {description}

            </p>

        </div>
    );
}

export default LoadingSpinner;