function ReportCard({ report }) {

    return (

        <div className="report-card">

            <h3>
                {report.report_name}
            </h3>

            <p>
                Status:
                {" "}
                {report.processing_status}
            </p>

            <p>
                Report ID:
                {" "}
                {report.id}
            </p>

        </div>
    );
}

export default ReportCard;