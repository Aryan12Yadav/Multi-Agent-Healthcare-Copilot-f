import { Link } from "react-router-dom";


function DashboardPage() {

    return (

        <div>

            <h1>
                MedSphere AI
            </h1>

            <Link to="/upload">

                Upload Report

            </Link>

            <br />

            <Link to="/chat">

                Medical Chat

            </Link>

        </div>
    );
}

export default DashboardPage;