import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import api from "../services/apiService";

function Reports() {

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [reports, setReports] =
        useState([]);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [riskFilter, setRiskFilter] =
        useState("All");

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedReportId, setSelectedReportId] =
        useState(null);

    useEffect(() => {
        async function loadReports() {
            try {
                const response = await api.get("/reports");
                setReports(response.data.reports || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadReports();

    }, []);

    async function deleteReport() {

        try {

            await api.delete(
                `/reports/${selectedReportId}`
            );

            setReports(
                reports.filter(
                    report =>
                    report.id !== selectedReportId
                )
            );

            setShowDeleteModal(
                false
            );

            setSelectedReportId(
                null
            );

        } catch (error) {

            console.log(error);
        }
    }

    const filteredReports =
        reports.filter(
            (report) => {

                const matchesSearch =
                    report.file_name
                    ?.toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

                const matchesRisk =
                    riskFilter === "All"
                    ||
                    report.risk_level ===
                    riskFilter;

                return (
                    matchesSearch
                    &&
                    matchesRisk
                );
            }
        );

    if (loading) {

        return <Loader />;
    }

    return (

        <>

            <div className="app-layout">

                <Sidebar />

                <div className="main-content">

                    <Navbar />

                    <div className="page-container">

                        <div className="page-header">

                            <div>

                                <h2>
                                    Medical Reports
                                </h2>

                                <p>
                                    Manage uploaded reports
                                </p>

                            </div>

                        </div>

                        <div className="reports-toolbar">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search report..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                            />

                            <select
                                className="form-select"
                                value={riskFilter}
                                onChange={(e) =>
                                    setRiskFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="All">
                                    All Risk Levels
                                </option>

                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>

                            </select>

                        </div>

                        <div className="report-table-card">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>
                                            Report ID
                                        </th>

                                        <th>
                                            File
                                        </th>

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Score
                                        </th>

                                        <th>
                                            Risk
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
    filteredReports.length === 0
    ? (
        <tr>

            <td
                colSpan="7"
                className="text-center"
            >

                No Reports Found

            </td>

        </tr>
    )
    : (
        filteredReports.map(
            (
                report
            ) => (

                <tr
                    key={
                        report.id
                    }
                >

                    <td>

                        <span
                            className="report-id-badge"
                        >
                            #{report.id}
                        </span>

                    </td>

                    <td>
                        {report.file_name}
                    </td>

                    <td>
                        {
                            report.document_category ||
                            "Unknown"
                        }
                    </td>

                    <td>
                        {
                            report.document_type ||
                            "Unknown"
                        }
                    </td>

                    <td>

                        <span
                            className="score-badge"
                        >
                            {report.health_score}
                        </span>

                    </td>

                    <td>

                        <span
                            className={
                                report.risk_level === "High"
                                ? "risk-high"
                                : report.risk_level === "Medium"
                                ? "risk-medium"
                                : "risk-low"
                            }
                        >

                            {report.risk_level}

                        </span>

                    </td>

                    <td>

                        <button
                            className="action-btn view-btn"
                            onClick={() =>
                                navigate(
                                    `/report/${report.id}`
                                )
                            }
                        >

                            View

                        </button>

                        <button
                            className="action-btn delete-btn"
                            onClick={() => {

                                setSelectedReportId(
                                    report.id
                                );

                                setShowDeleteModal(
                                    true
                                );
                            }}
                        >

                            Delete

                        </button>

                    </td>

                </tr>

            )
        )
    )
}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

            {
                showDeleteModal && (

                    <div className="custom-modal-overlay">

                        <div className="custom-modal">

                            <h4>
                                Delete Report
                            </h4>

                            <p>
                                Are you sure you want to delete this report?
                            </p>

                            <div className="modal-actions">

                                <button
                                    className="cancel-btn"
                                    onClick={() => {

                                        setShowDeleteModal(
                                            false
                                        );

                                        setSelectedReportId(
                                            null
                                        );
                                    }}
                                >

                                    Cancel

                                </button>

                                <button
                                    className="delete-confirm-btn"
                                    onClick={
                                        deleteReport
                                    }
                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </>

    );
}

export default Reports;