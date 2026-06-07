import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import api from "../services/apiService";

function parseList(data) {

 
if (!data) {

    return [];
}

if (Array.isArray(data)) {

    return data;
}

try {

    return JSON.parse(data);

} catch {

    return [];
}
 

}

function ReportDetails() {

 
const { id } =
    useParams();

const [loading, setLoading] =
    useState(true);

const [analysis, setAnalysis] =
    useState(null);

const [question, setQuestion] =
    useState("");

const [chatLoading, setChatLoading] =
    useState(false);

const [chatMessages, setChatMessages] =
    useState([]);

const chatEndRef =
    useRef(null);

useEffect(() => {

    loadAnalysis();

}, [id]);

useEffect(() => {

    chatEndRef.current?.scrollIntoView({
        behavior: "smooth"
    });

}, [chatMessages]);

async function loadAnalysis() {

    try {

        const response =
            await api.get(
                `/reports/${id}/analysis`
            );

        setAnalysis(
            response.data.analysis
        );

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);
    }
}

async function askReportAI() {

    if (
        !question.trim()
        ||
        chatLoading
    ) {

        return;
    }

    const currentQuestion =
        question;

    setQuestion("");

    setChatMessages(
        (prev) => [
            ...prev,
            {
                role: "user",
                text: currentQuestion,
                time:
                new Date()
                .toLocaleTimeString()
            }
        ]
    );

    setChatLoading(true);

    try {

        const response =
            await api.post(
                "/chat/report",
                null,
                {
                    params: {
                        report_id: id,
                        question: currentQuestion
                    }
                }
            );

        setChatMessages(
            (prev) => [
                ...prev,
                {
                    role: "assistant",
                    text:
                    response.data.answer,
                    time:
                    new Date()
                    .toLocaleTimeString()
                }
            ]
        );

    } catch (error) {

        console.log(error);

        setChatMessages(
            (prev) => [
                ...prev,
                {
                    role: "assistant",
                    text:
                    "Unable to analyze this report right now.",
                    time:
                    new Date()
                    .toLocaleTimeString()
                }
            ]
        );

    } finally {

        setChatLoading(false);
    }
}

function clearChat() {

    setChatMessages([]);
}

if (loading) {

    return <Loader />;
}

const abnormalFindings =
    parseList(
        analysis?.abnormal_findings
    );

const criticalFindings =
    parseList(
        analysis?.critical_findings
    );

const recommendations =
    parseList(
        analysis?.recommendations
    );

return (

    <div className="app-layout">

        <Sidebar />

        <div className="main-content">

            <Navbar />

            <div className="page-container">

                {
                    !analysis
                    ?
                    (
                        <div className="analysis-card">

                            <h3>
                                Analysis Not Found
                            </h3>

                        </div>
                    )
                    :
                    (
                        <>

                            <div className="details-header">

                                <h2>
                                    Full Report Analysis
                                </h2>

                                <p>
                                    AI Powered Medical Intelligence
                                </p>

                            </div>

                            <div className="row g-4">

                                <div className="col-md-4">

                                    <div className="summary-card">

                                        <h5>
                                            Health Score
                                        </h5>

                                        <div className="health-circle">

                                            {
                                                analysis.health_score
                                            }

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-4">

                                    <div className="summary-card">

                                        <h5>
                                            Risk Level
                                        </h5>

                                        <div
                                            className={
                                                analysis.risk_level === "High"
                                                ?
                                                "risk-badge risk-high"
                                                :
                                                analysis.risk_level === "Medium"
                                                ?
                                                "risk-badge risk-medium"
                                                :
                                                "risk-badge risk-low"
                                            }
                                        >

                                            {
                                                analysis.risk_level
                                            }

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-4">

                                    <div className="summary-card">

                                        <h5>
                                            Document Type
                                        </h5>

                                        <div
                                            className="document-type"
                                        >

                                            {
                                                analysis.document_type
                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="analysis-card mt-4">

                                <h4>
                                    AI Summary
                                </h4>

                                <hr />

                                <p>

                                    {
                                        analysis.summary
                                    }

                                </p>

                            </div>

                            <div className="analysis-card mt-4">

                                <h4>
                                    Patient Information
                                </h4>

                                <hr />

                                <div className="info-grid">

                                    <div className="analysis-item">

                                        <span>
                                            Patient Name
                                        </span>

                                        <strong>

                                            {
                                                analysis.patient_name
                                                || "N/A"
                                            }

                                        </strong>

                                    </div>

                                    <div className="analysis-item">

                                        <span>
                                            Person Name
                                        </span>

                                        <strong>

                                            {
                                                analysis.person_name
                                                || "N/A"
                                            }

                                        </strong>

                                    </div>

                                    <div className="analysis-item">

                                        <span>
                                            Age
                                        </span>

                                        <strong>

                                            {
                                                analysis.age
                                                || "N/A"
                                            }

                                        </strong>

                                    </div>

                                    <div className="analysis-item">

                                        <span>
                                            Gender
                                        </span>

                                        <strong>

                                            {
                                                analysis.gender
                                                || "N/A"
                                            }

                                        </strong>

                                    </div>

                                </div>

                            </div>

                            <div className="analysis-card mt-4">

                                <h4>
                                    Report Information
                                </h4>

                                <hr />

                                <div className="info-grid">

                                    <div className="analysis-item">

                                        <span>
                                            Category
                                        </span>

                                        <strong>

                                            {
                                                analysis.document_category
                                            }

                                        </strong>

                                    </div>
 

 
                                    <div className="analysis-item">

                                        <span>
                                            Document Type
                                        </span>

                                        <strong>

                                            {
                                                analysis.document_type
                                            }

                                        </strong>

                                    </div>

                                    <div className="analysis-item">

                                        <span>
                                            Medical Report
                                        </span>

                                        <strong>

                                            {
                                                analysis.is_medical_report
                                                ? "Yes"
                                                : "No"
                                            }

                                        </strong>

                                    </div>

                                    <div className="analysis-item">

                                        <span>
                                            Risk Level
                                        </span>

                                        <strong>

                                            {
                                                analysis.risk_level
                                            }

                                        </strong>

                                    </div>

                                </div>

                            </div>

                            <div className="analysis-card mt-4">

                                <h4>
                                    Abnormal Findings
                                </h4>

                                <hr />

                                {
                                    abnormalFindings.length > 0
                                    ?
                                    (
                                        <ul>

                                            {
                                                abnormalFindings.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                            className="mb-2"
                                                        >

                                                            {item}

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>
                                    )
                                    :
                                    (
                                        <p>

                                            No abnormal findings detected.

                                        </p>
                                    )
                                }

                            </div>

                            <div className="analysis-card mt-4">

                                <h4>
                                    Critical Findings
                                </h4>

                                <hr />

                                {
                                    criticalFindings.length > 0
                                    ?
                                    (
                                        <ul>

                                            {
                                                criticalFindings.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                            className="mb-2 text-danger"
                                                        >

                                                            {item}

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>
                                    )
                                    :
                                    (
                                        <p>

                                            No critical findings reported.

                                        </p>
                                    )
                                }

                            </div>

                            <div className="analysis-card mt-4">

                                <h4>
                                    Recommendations
                                </h4>

                                <hr />

                                {
                                    recommendations.length > 0
                                    ?
                                    (
                                        <ul>

                                            {
                                                recommendations.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                            className="mb-2"
                                                        >

                                                            {item}

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>
                                    )
                                    :
                                    (
                                        <p>

                                            No recommendations available.

                                        </p>
                                    )
                                }

                            </div>

                            <div className="analysis-card mt-4">

                                <h4>
                                    Structured Report
                                </h4>

                                <hr />

                                <pre
                                    style={{
                                        whiteSpace:
                                            "pre-wrap",
                                        fontFamily:
                                            "inherit"
                                    }}
                                >

                                    {
                                        analysis.structured_report
                                        || "Not Available"
                                    }

                                </pre>

                            </div>

                            <div className="analysis-card mt-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <h4>
                                        Ask AI About This Report
                                    </h4>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={clearChat}
                                    >

                                        Clear Chat

                                    </button>

                                </div>

                                <hr />

                                {
                                    chatMessages.length === 0
                                    &&
                                    (
                                        <div className="suggestion-box">

                                            <button
                                                className="suggestion-btn"
                                                onClick={() =>
                                                    setQuestion(
                                                        "What are the abnormal findings?"
                                                    )
                                                }
                                            >

                                                Abnormal Findings

                                            </button>

                                            <button
                                                className="suggestion-btn"
                                                onClick={() =>
                                                    setQuestion(
                                                        "Explain this report in simple language"
                                                    )
                                                }
                                            >

                                                Explain Report

                                            </button>

                                            <button
                                                className="suggestion-btn"
                                                onClick={() =>
                                                    setQuestion(
                                                        "What should I discuss with my doctor?"
                                                    )
                                                }
                                            >

                                                Doctor Discussion

                                            </button>

                                        </div>
                                    )
                                }

                                <div
                                    className="report-chat-box"
                                >

                                    {
                                        chatMessages.length === 0
                                        &&
                                        (
                                            <div
                                                className="welcome-box"
                                            >

                                                Ask questions about this report.

                                            </div>
                                        )
                                    }

                                    {
                                        chatMessages.map(
                                            (
                                                message,
                                                index
                                            ) => (

                                                <div
                                                    key={index}
                                                >

                                                    <div
                                                        className={
                                                            message.role === "user"
                                                            ?
                                                            "user-bubble"
                                                            :
                                                            "bot-bubble"
                                                        }
                                                    >

                                                        {
                                                            message.text
                                                        }

                                                    </div>

                                                    <div
                                                        className="message-time"
                                                    >

                                                        {
                                                            message.time
                                                        }

                                                    </div>

                                                </div>

                                            )
                                        )
                                    }

                                    {
                                        chatLoading
                                        &&
                                        (
                                            <div
                                                className="bot-bubble"
                                            >

                                                MedSphere AI is analyzing this report...

                                            </div>
                                        )
                                    }

                                    <div
                                        ref={chatEndRef}
                                    />

                                </div>

                                <div
                                    className="d-flex gap-2 mt-3"
                                >

                                    <input
                                        className="form-control"
                                        value={question}
                                        disabled={chatLoading}
                                        placeholder="Ask about this report..."
                                        onChange={(e) =>
                                            setQuestion(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) => {

                                            if (
                                                e.key === "Enter"
                                                &&
                                                !chatLoading
                                            ) {

                                                askReportAI();
                                            }
                                        }}
                                    />

                                    <button
                                        className="btn btn-primary"
                                        onClick={
                                            askReportAI
                                        }
                                        disabled={
                                            chatLoading
                                        }
                                    >

                                        {
                                            chatLoading
                                            ?
                                            "Analyzing..."
                                            :
                                            "Ask AI"
                                        }

                                    </button>

                                </div>

                            </div>

                        </>

                    )
                }

            </div>

        </div>

    </div>

);
 

}

export default ReportDetails;

