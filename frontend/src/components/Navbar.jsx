import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem(
            "access_token"
        );

        navigate(
            "/login"
        );
    };

    return (

        <nav className="navbar">

            <div className="navbar-logo">

                MedSphere AI

            </div>

            <div className="navbar-links">

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Dashboard
                </button>

                <button
                    onClick={() =>
                        navigate("/reports")
                    }
                >
                    Reports
                </button>

                <button
                    onClick={() =>
                        navigate("/chat")
                    }
                >
                    Chat
                </button>

                <button
                    onClick={() =>
                        navigate("/profile")
                    }
                >
                    Profile
                </button>

                <button
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;