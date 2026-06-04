function AnalysisCard({ title, value }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-lg font-semibold mb-3">

                {title}

            </h3>

            <p>

                {value}

            </p>

        </div>
    );
}

export default AnalysisCard;