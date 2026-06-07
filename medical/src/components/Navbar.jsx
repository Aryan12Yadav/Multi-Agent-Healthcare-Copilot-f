import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate =
        useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "{}"
        );

    const userName =
        user.name || "User";

    function logout() {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/");
    }

    return (

        <div className="top-navbar">

            <div>

                <h5>
                    MedSphere AI
                </h5>

                <small>
                    Healthcare Intelligence Platform
                </small>

            </div>

            <div
                className="navbar-right"
            >

                <div
                    className="user-info"
                >

                    <div
                        className="user-badge"
                    >

                        {
                            userName
                            .charAt(0)
                            .toUpperCase()
                        }

                    </div>

                    <span>

                        {userName}

                    </span>

                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </div>

        </div>

    );
}

export default Navbar;