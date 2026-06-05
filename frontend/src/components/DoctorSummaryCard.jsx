function DoctorSummaryCard({
    summary
}) {

    return (

        <div
            className="doctor-summary"
        >

            <h2>
                Doctor Visit Summary
            </h2>

            <p>
                {summary}
            </p>

        </div>
    );
}

export default DoctorSummaryCard;