import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { uploadReport } from "../services/reportService";

function UploadPage() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleUpload = async() => {

        if (!file) {

            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            await uploadReport(
                formData
            );

            alert(
                "Report uploaded successfully"
            );

        } catch(error) {

            console.log(error);

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

                    <div className="bg-white rounded-[32px] p-8 shadow-sm">

                        <h1 className="text-4xl font-bold">

                            Upload Medical Report

                        </h1>

                        <p className="text-slate-500 mt-3">

                            Upload PDF, Image or Medical Documents
                        </p>

                        <div className="mt-10 border-2 border-dashed border-violet-300 rounded-[32px] p-16 text-center">

                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="mt-8 bg-violet-600 text-white px-8 py-4 rounded-2xl"
                            >

                                {
                                    loading
                                        ? "Uploading..."
                                        : "Upload Report"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default UploadPage;