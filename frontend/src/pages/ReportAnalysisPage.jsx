import { useEffect } from "react";

import { useState } from "react";

import { useParams } from "react-router-dom";

import { getAnalysis } from "../services/reportService";


function ReportAnalysisPage() {

    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAnalysis();

    }, []);


    const fetchAnalysis = async() => {

        try {

            const response = await getAnalysis(
                id
            );

            setAnalysis(response);

        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (
            <h2>
                Loading Analysis...
            </h2>
        );
    }

    return (

        <div>

            <h1>
                Report Analysis
            </h1>

            <pre>

                {
                    JSON.stringify(
                        analysis,
                        null,
                        4
                    )
                }

            </pre>

        </div>
    );
}

export default ReportAnalysisPage;