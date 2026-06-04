import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { uploadReport } from "../services/reportService";


function UploadReportPage() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleUpload = async() => {

        if (!file) {

            setMessage(
                "Please select a file"
            );

            return;
        }

        try {

            setLoading(true);

            const response = await uploadReport(
                file
            );

            setMessage(
                "Report uploaded successfully"
            );

            console.log(response);

        } catch(error) {

            console.log(error);

            setMessage(
                "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Upload Medical Report

                </h1>

                <div className="bg-white p-8 rounded-xl shadow">

                    <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => {
                            setFile(
                                e.target.files[0]
                            );
                        }}
                    />

                    {
                        file && (

                            <div className="mt-4">

                                <p>

                                    File Name:

                                </p>

                                <p>

                                    {file.name}

                                </p>

                                <p>

                                    {(file.size / 1024).toFixed(2)} KB

                                </p>

                            </div>
                        )
                    }

                    <button
                        onClick={handleUpload}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
                    >

                        {
                            loading
                            ? "Uploading..."
                            : "Upload Report"
                        }

                    </button>

                    {
                        message && (

                            <div className="mt-4">

                                {message}

                            </div>
                        )
                    }

                </div>

            </div>

        </DashboardLayout>
    );
}

export default UploadReportPage;