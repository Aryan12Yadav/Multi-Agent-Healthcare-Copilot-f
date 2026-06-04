import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { uploadReport } from "../services/reportService";

function UploadPage() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const handleFileChange = event => {

        const selectedFile = event.target.files[0];

        if (!selectedFile) {

            return;
        }

        setFile(
            selectedFile
        );
    };

    const handleUpload = async() => {

        if (!file) {

            alert(
                "Please select a report"
            );

            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            const response = await uploadReport(
                formData
            );

            setSuccess(
                true
            );

            setTimeout(() => {

                navigate(
                    "/analysis",
                    {
                        state: {
                            reportId: response?.report_id
                        }
                    }
                );

            }, 1500);

        } catch(error) {

            console.log(error);

            alert(
                "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <div className="p-8">

                    <div className="max-w-5xl mx-auto">

                        <div className="bg-white rounded-[40px] p-10 shadow-sm">

                            <h1 className="text-5xl font-bold">

                                Upload Medical Report

                            </h1>

                            <p className="text-slate-500 text-lg mt-4">

                                Upload PDF, PNG or JPG reports for AI analysis

                            </p>

                            <div className="mt-10 border-2 border-dashed border-violet-300 rounded-[40px] p-20 text-center bg-violet-50">

                                <input
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="report-file"
                                />

                                <label
                                    htmlFor="report-file"
                                    className="cursor-pointer"
                                >

                                    <div className="text-7xl">

                                        📄

                                    </div>

                                    <h2 className="text-3xl font-bold mt-6">

                                        Drag & Drop Report

                                    </h2>

                                    <p className="text-slate-500 mt-4">

                                        Click here to select file

                                    </p>

                                </label>

                            </div>

                            {
                                file && (

                                    <div className="bg-slate-50 border rounded-3xl p-6 mt-8">

                                        <h3 className="font-bold text-xl">

                                            Selected File

                                        </h3>

                                        <p className="mt-3">

                                            {file.name}

                                        </p>

                                        <p className="text-slate-500 mt-2">

                                            {(file.size / 1024 / 1024).toFixed(2)} MB

                                        </p>

                                    </div>

                                )
                            }

                            {
                                success && (

                                    <div className="bg-green-50 border border-green-300 rounded-3xl p-5 mt-6 text-green-700">

                                        Report Uploaded Successfully

                                    </div>

                                )
                            }

                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="w-full h-16 mt-8 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-lg font-semibold transition"
                            >

                                {
                                    loading
                                        ? "Uploading..."
                                        : "Upload & Analyze"
                                }

                            </button>

                        </div>

                        <div className="bg-white rounded-[40px] p-8 mt-8 shadow-sm">

                            <h2 className="text-3xl font-bold">

                                Supported Reports

                            </h2>

                            <div className="grid lg:grid-cols-4 gap-4 mt-6">

                                <div className="bg-slate-50 rounded-2xl p-5">

                                    CBC Report

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5">

                                    Blood Test

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5">

                                    MRI Scan

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5">

                                    X-Ray Report

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default UploadPage;