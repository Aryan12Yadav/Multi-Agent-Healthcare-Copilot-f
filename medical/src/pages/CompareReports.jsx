
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import api from "../services/apiService";

function CompareReports() {

    const [oldReportId, setOldReportId] =
        useState("");

    const [newReportId, setNewReportId] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [comparison, setComparison] =
        useState(null);

    const [error, setError] =
        useState("");

    async function compareReports() {

        if (
            !oldReportId ||
            !newReportId
        ) {

            setError(
                "Please enter both report IDs."
            );

            return;
        }

        setError("");

        setComparison(null);

        setLoading(true);

        try {

            const response =
                await api.get(
                    `/reports/compare/${oldReportId}/${newReportId}`
                );

            setComparison(
                response.data.comparison
            );

        } catch (error) {

            console.log(error);

            setError(
                error?.response?.data?.detail ||
                "Comparison failed."
            );

        } finally {

            setLoading(false);
        }
    }

    return (

        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-container">

                    <div className="compare-header">

                        <h2>

                            Compare Reports

                        </h2>

                        <p>

                            Compare health progress between two reports

                        </p>

                    </div>

                    <div className="compare-card">

                        <div className="row g-3">

                            <div className="col-md-5">

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Old Report ID"
                                    value={oldReportId}
                                    onChange={(e) =>
                                        setOldReportId(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-5">

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="New Report ID"
                                    value={newReportId}
                                    onChange={(e) =>
                                        setNewReportId(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={
                                        compareReports
                                    }
                                    disabled={
                                        loading
                                    }
                                >

                                    {
                                        loading
                                        ? "Loading..."
                                        : "Compare"
                                    }

                                </button>

                            </div>

                        </div>

                        {
                            error && (

                                <div className="alert alert-danger mt-3">

                                    {error}

                                </div>

                            )
                        }

                    </div>

                    {
                        loading &&
                        <Loader />
                    }

                    {
                        comparison && (

                            <div className="comparison-result mt-4">

                                <div className="row g-4">

                                    <div className="col-md-3">

                                        <div className="compare-stat-card">

                                            <h5>

                                                Old Score

                                            </h5>

                                            <h2>

                                                {
                                                    comparison.old_score ?? "-"
                                                }

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="col-md-3">

                                        <div className="compare-stat-card">

                                            <h5>

                                                New Score

                                            </h5>

                                            <h2>

                                                {
                                                    comparison.new_score ?? "-"
                                                }

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="col-md-3">

                                        <div className="compare-stat-card">

                                            <h5>

                                                Difference

                                            </h5>

                                            <h2>

                                                {
                                                    comparison.difference ?? "-"
                                                }

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="col-md-3">

                                        <div className="compare-stat-card">

                                            <h5>

                                                Trend

                                            </h5>

                                            <h2>

                                                {
                                                    comparison.trend ?? "-"
                                                }

                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    );
}

export default CompareReports;
