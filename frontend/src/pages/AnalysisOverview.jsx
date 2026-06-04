function AnalysisOverview({ title, value }) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-semibold mb-2">

                {title}

            </h3>

            <p>

                {value}

            </p>

        </div>
    );
}

export default AnalysisOverview;