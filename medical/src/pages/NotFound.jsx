import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="notfound-wrapper">

            <div className="notfound-card">

                <div className="error-code">

                    404

                </div>

                <h1>

                    Page Not Found

                </h1>

                <p>

                    The page you are looking for does not exist or has been moved.

                </p>

                <Link
                    to="/dashboard"
                    className="back-home-btn"
                >

                    Back To Dashboard

                </Link>

            </div>

        </div>

    );
}

export default NotFound;