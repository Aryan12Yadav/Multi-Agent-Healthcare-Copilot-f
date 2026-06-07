import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import api from "../services/apiService";

function UploadReport() {

 const navigate =
    useNavigate();

const [file, setFile] =
    useState(null);

const [uploading, setUploading] =
    useState(false);

const [result, setResult] =
    useState(null);

const [error, setError] =
    useState("");

async function uploadFile() {

    if (!file) {

        setError(
            "Please select a file first"
        );

        return;
    }

    setUploading(true);

    setError("");

    setResult(null);

    try {

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        const response =
            await api.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                        "multipart/form-data"
                    }
                }
            );

        setResult(
            response.data
        );

    } catch (error) {

        console.log(error);

        setError(
            error?.response?.data?.detail ||
            "Upload failed"
        );

    } finally {

        setUploading(false);
    }
}

function resetUpload() {

    setFile(null);

    setResult(null);

    setError("");
}

return (

    <div className="app-layout">

        <Sidebar />

        <div className="main-content">

            <Navbar />

            <div className="page-container">

                <div className="page-header">

                    <div>

                        <h2>
                            Upload Medical Report
                        </h2>

                        <p>
                            AI Powered OCR & Medical Analysis
                        </p>

                    </div>

                </div>

                <div className="upload-card">

                    <div className="upload-area">

                        <i className="bi bi-cloud-arrow-up"></i>

                        <h4>
                            Upload Medical Report
                        </h4>

                        <p>
                            PDF, PNG, JPG, JPEG, TXT
                        </p>

                        <input
                            type="file"
                            className="form-control mt-4"
                            accept=".pdf,.png,.jpg,.jpeg,.txt"
                            onChange={(event) =>
                                setFile(
                                    event.target.files[0]
                                )
                            }
                        />

                    </div>

                    {
                        file && (

                            <div className="file-name">

                                {file.name}

                            </div>

                        )
                    }

                    {
                        error && (

                            <div className="alert alert-danger mt-3">

                                {error}

                            </div>

                        )
                    }

                    <button
                        className="upload-btn"
                        onClick={uploadFile}
                        disabled={uploading}
                    >

                        {
                            uploading
                            ?
                            "Analyzing Report..."
                            :
                            "Upload & Analyze"
                        }

                    </button>

                </div>

                {
                    uploading && (

                        <div className="analysis-result-card">

                            <div className="upload-loader">

                                <div className="spinner-border text-primary"></div>

                                <p>
                                    OCR Processing & AI Analysis Running...
                                </p>

                            </div>

                        </div>

                    )
                }

                {
                    result && (

                        <div className="analysis-result-card">

                            <h4>
                                Analysis Completed
                            </h4>

                            <div className="health-score-box">

                                <h1>

                                    {
                                        result.health_score || 0
                                    }

                                </h1>

                                <p>
                                    Health Score
                                </p>

                            </div>

                            <div className="result-grid">

                                <div className="result-item">

                                    <span>
                                        Report ID
                                    </span>

                                    <strong>
                                        {result.report_id}
                                    </strong>

                                </div>

                                <div className="result-item">

                                    <span>
                                        Document Type
                                    </span>

                                    <strong>
                                        {result.document_type}
                                    </strong>

                                </div>

                                <div className="result-item">

                                    <span>
                                        Category
                                    </span>

                                    <strong>
                                        {result.document_category}
                                    </strong>

                                </div>

                                <div className="result-item">

                                    <span>
                                        Risk Level
                                    </span>

                                    <strong>
                                        {result.risk_level}
                                    </strong>

                                </div>

                                <div className="result-item">

                                    <span>
                                        OCR Characters
                                    </span>

                                    <strong>
                                        {result.ocr_characters}
                                    </strong>

                                </div>

                            </div>

                            <h5 className="mt-4">
                                AI Summary
                            </h5>

                            <div className="summary-box">

                                {
                                    result.summary
                                }

                            </div>

                            <div className="mt-4 d-flex gap-2">

                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        navigate(
                                            `/report/${result.report_id}`
                                        )
                                    }
                                >

                                    View Full Analysis

                                </button>

                                <button
                                    className="btn btn-outline-primary"
                                    onClick={resetUpload}
                                >

                                    Upload Another

                                </button>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    </div>
);
 
}

export default UploadReport;
