import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

function UploadReportPage() {

    const [file, setFile] = useState(null);

    return (

        <DashboardLayout>

            <div className="p-10 bg-slate-50 min-h-screen">

                <div className="max-w-4xl mx-auto">

                    <h1 className="text-4xl font-bold mb-3">

                        Upload Medical Report

                    </h1>

                    <p className="text-slate-500 mb-10">

                        Upload blood reports, prescriptions, MRI, CT Scan,
                        X-Ray and other medical documents.

                    </p>

                    <div className="bg-white rounded-3xl shadow-xl p-10">

                        <div className="border-2 border-dashed border-purple-300 rounded-3xl p-20 text-center">

                            <h2 className="text-2xl font-semibold mb-4">

                                Drag & Drop Medical Report
                            </h2>

                            <p className="text-slate-500 mb-6">

                                PDF, PNG, JPG Supported
                            </p>

                            <input
                                type="file"
                                onChange={e => setFile(e.target.files[0])}
                                className="mb-6"
                            />

                            <button className="bg-purple-600 text-white px-8 py-4 rounded-xl">

                                Upload Report

                            </button>

                            {
                                file &&
                                <p className="mt-6 text-green-600">

                                    {file.name}

                                </p>
                            }

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default UploadReportPage;