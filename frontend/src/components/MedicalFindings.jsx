function MedicalFindings({
    findings
}) {

    return (

        <div className="medical-findings">

            <h2>
                Medical Findings
            </h2>

            {
                findings?.length > 0
                ? (
                    findings.map(
                        (
                            finding,
                            index
                        ) => (

                            <div
                                key={index}
                                className="finding-item"
                            >

                                {finding}

                            </div>

                        )
                    )
                )
                : (
                    <p>
                        No findings available
                    </p>
                )
            }

        </div>
    );
}

export default MedicalFindings;