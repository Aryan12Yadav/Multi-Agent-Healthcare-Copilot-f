import { Link } from "react-router-dom";


function QuickActions() {

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-4">

                Quick Actions

            </h2>

            <div className="flex gap-4">

                <Link
                    to="/upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >

                    Upload Report

                </Link>

                <Link
                    to="/chat"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >

                    Medical Chat

                </Link>

            </div>

        </div>
    );
}

export default QuickActions;