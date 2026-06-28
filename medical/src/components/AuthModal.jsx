import { useState, useContext } from "react";
import api from "../services/apiService";
import { AuthContext } from "../context/AuthContext";

function AuthModal() {
    const { showAuthModal, setShowAuthModal, login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    if (!showAuthModal) return null;

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    async function submitForm() {
        setError("");
        setSuccess("");

        if (!isLogin && !form.name.trim()) {
            setError("Name is required");
            return;
        }
        if (!form.email.trim()) {
            setError("Email is required");
            return;
        }
        if (!form.password.trim()) {
            setError("Password is required");
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                const response = await api.post("/auth/login", null, {
                    params: {
                        email: form.email,
                        password: form.password
                    }
                });
                login(response.data);
            } else {
                await api.post("/auth/register", null, {
                    params: {
                        name: form.name,
                        email: form.email,
                        password: form.password
                    }
                });
                setSuccess("Registration Successful. Please Login.");
                setForm({ name: "", email: "", password: "" });
                setIsLogin(true);
            }
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.detail || "Authentication Failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
            <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close-btn" onClick={() => setShowAuthModal(false)}>
                    <i className="bi bi-x-lg"></i>
                </button>
                
                <h2>{isLogin ? "Welcome to MedSphere AI" : "Create Account"}</h2>
                <p>{isLogin ? "Please sign in to access personalized healthcare insights" : "Sign up to track and analyze your medical reports"}</p>

                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                <div className="auth-modal-fields">
                    {!isLogin && (
                        <div className="input-group-custom">
                            <i className="bi bi-person"></i>
                            <input
                                className="form-control"
                                placeholder="Full Name"
                                name="name"
                                value={form.name}
                                disabled={loading}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="input-group-custom">
                        <i className="bi bi-envelope"></i>
                        <input
                            className="form-control"
                            placeholder="Email Address"
                            name="email"
                            value={form.email}
                            disabled={loading}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group-custom">
                        <i className="bi bi-lock"></i>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            disabled={loading}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    submitForm();
                                }
                            }}
                        />
                    </div>
                </div>

                <button className="auth-btn mt-3" disabled={loading} onClick={submitForm}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        isLogin ? "Sign In" : "Sign Up"
                    )}
                </button>

                <div className="text-center mt-3">
                    <button
                        className="btn btn-link toggle-auth-btn"
                        disabled={loading}
                        onClick={() => {
                            setError("");
                            setSuccess("");
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "New to MedSphere? Create an account" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
