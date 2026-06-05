function HealthScoreCard({
    score,
    riskLevel
}) {

    return (

        <div className="health-score-card">

            <h3>
                Health Score
            </h3>

            <h1>
                {score}
            </h1>

            <p>
                Risk Level:
                {" "}
                {riskLevel}
            </p>

        </div>
    );
}

export default HealthScoreCard;