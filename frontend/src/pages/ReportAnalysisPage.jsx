import { useEffect } from "react";

import { useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import AnalysisCard from "../components/AnalysisCard";

import { getAnalysis } from "../services/reportService";


function ReportAnalysisPage() {

    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalysis();

    }, []);


    const loadAnalysis = async() => {

        try {

            const response = await getAnalysis(id);

            setAnalysis(response);

        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="p-8">

                    Loading Analysis...

                </div>

            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Medical Analysis

                </h1>

                <div className="grid grid-cols-2 gap-6">

                    <AnalysisCard
                        title="Report Type"
                        value={analysis?.report_type}
                    />

                    <AnalysisCard
                        title="Summary"
                        value={analysis?.summary}
                    />

                </div>

            </div>

            {
    analysis?.finding_json?.recommendations && (

        <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-4">

                Recommendations

            </h2>

            <ul>

                {
                    analysis.finding_json.recommendations.map(
                        (item, index) => (

                            <li key={index}>

                                {item}

                            </li>
                        )
                    )
                }

            </ul>

        </div>
    )
}

        </DashboardLayout>
    );
}

export default ReportAnalysisPage;