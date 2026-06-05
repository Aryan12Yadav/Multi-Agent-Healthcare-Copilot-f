function ErrorState({
    title = "Something Went Wrong",
    description = "Please try again later"
}) {

    return (
        <div className="bg-red-50 border border-red-200 rounded-[32px] p-10 text-center">

            <div className="text-6xl">

                ⚠️

            </div>

            <h2 className="text-3xl font-bold text-red-600 mt-5">

                {title}

            </h2>

            <p className="text-red-500 mt-3">

                {description}

            </p>

        </div>
    );
}

export default ErrorState;