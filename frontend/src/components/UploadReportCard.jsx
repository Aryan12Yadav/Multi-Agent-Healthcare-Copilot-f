function UploadReportCard() {

    return (
        <div className="bg-white rounded-3xl p-8 border shadow-sm">

            <h2 className="text-xl font-bold mb-6">

                Upload New Report

            </h2>

            <div className="border-2 border-dashed rounded-3xl p-12 text-center">

                <p className="text-slate-500">

                    Drag & Drop PDF Report

                </p>

                <button className="mt-6 bg-violet-600 text-white px-8 py-3 rounded-xl">

                    Browse File

                </button>

            </div>

        </div>
    );
}

export default UploadReportCard;