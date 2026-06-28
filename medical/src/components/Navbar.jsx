import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { token, user, logout, setShowAuthModal } = useContext(AuthContext);

    const userName = user?.name || "Guest";

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className="top-navbar">
            <div>
                <h5>MedSphere AI</h5>
                <small>Healthcare Intelligence Platform</small>
            </div>

            <div className="navbar-right">
                <div className="user-info">
                    <div className="user-badge">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <span>{userName}</span>
                </div>

                {token ? (
                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        Logout
                    </button>
                ) : (
                    <button className="login-btn btn btn-primary" onClick={() => setShowAuthModal(true)}>
                        <i className="bi bi-box-arrow-in-right"></i>
                        Login / Register
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;