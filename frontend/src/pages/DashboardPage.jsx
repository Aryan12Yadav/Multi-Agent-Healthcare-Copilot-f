import { Link } from "react-router-dom";


function DashboardPage() {

    return (

        <div>

            <h1>
                MedSphere AI
            </h1>

            <br />

            <Link to="/upload">

                Upload Report

            </Link>

            <br />

            <br />

            <Link to="/analysis/1">

                View Analysis

            </Link>

            <br />

            <br />

            <Link to="/chat">

                Medical Chat

            </Link>

        </div>
    );
}

export default DashboardPage;