import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import api from "../api/api";

import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import HealthScoreCard from "../components/HealthScoreCard";
import MedicalFindings from "../components/MedicalFindings";

function ReportAnalysis() {

    const { id } = useParams();

    const [analysis, setAnalysis] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchAnalysis();

    }, []);

    const fetchAnalysis = async () => {

        try {

            const response =
                await api.get(
                    `/analysis/${id}`
                );

            setAnalysis(
                response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return <Loading />;
    }

    return (

        <div className="layout">

            <Sidebar />

            <div className="content">

                <h1>
                    Report Analysis
                </h1>

                <HealthScoreCard
                    score={
                        analysis?.health_score || 0
                    }
                    riskLevel={
                        analysis?.risk_level || "Unknown"
                    }
                />

                <MedicalFindings
                    findings={
                        analysis?.analysis?.abnormal_findings || []
                    }
                />

            </div>

        </div>
    );
}

export default ReportAnalysis;