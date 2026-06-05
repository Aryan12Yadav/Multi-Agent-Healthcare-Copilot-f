function UploadZone({
    onFileSelect,
    loading
}) {

    return (
        <div className="border-2 border-dashed border-violet-300 rounded-[32px] p-16 text-center bg-gradient-to-br from-violet-50 to-indigo-50">

            <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center shadow-sm">

                <span className="text-4xl">

                    📄

                </span>

            </div>

            <h2 className="text-3xl font-bold mt-8">

                Upload Medical Report

            </h2>

            <p className="text-slate-500 mt-4">

                PDF, JPG, PNG Supported
            </p>

            <input
                type="file"
                className="mt-8 block mx-auto"
                onChange={(e) =>
                    onFileSelect(
                        e.target.files[0]
                    )
                }
            />

            {
                loading && (

                    <div className="mt-8">

                        <p className="text-violet-600 font-semibold">

                            Uploading Report...

                        </p>

                    </div>

                )
            }

        </div>
    );
}

export default UploadZone;function UploadZone({
    onFileSelect,
    loading
}) {

    return (
        <div className="border-2 border-dashed border-violet-300 rounded-[32px] p-16 text-center bg-gradient-to-br from-violet-50 to-indigo-50">

            <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center shadow-sm">

                <span className="text-4xl">

                    📄

                </span>

            </div>

            <h2 className="text-3xl font-bold mt-8">

                Upload Medical Report

            </h2>

            <p className="text-slate-500 mt-4">

                PDF, JPG, PNG Supported
            </p>

            <input
                type="file"
                className="mt-8 block mx-auto"
                onChange={(e) =>
                    onFileSelect(
                        e.target.files[0]
                    )
                }
            />

            {
                loading && (

                    <div className="mt-8">

                        <p className="text-violet-600 font-semibold">

                            Uploading Report...

                        </p>

                    </div>

                )
            }

        </div>
    );
}

export default UploadZone;