function AnalysisDetails({
    analysis
}) {

    return (

        <div className="analysis-details">

            <h2>
                Analysis Summary
            </h2>

            <p>

                {
                    analysis?.summary
                }

            </p>

            <h2>
                Detailed Analysis
            </h2>

            <p>

                {
                    analysis?.detailed_analysis
                }

            </p>

        </div>
    );
}

export default AnalysisDetails;