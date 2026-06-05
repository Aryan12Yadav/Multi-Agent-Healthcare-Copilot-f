import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "access_token",
                response.data.access_token
            );

            navigate(
                "/dashboard"
            );

        } catch (error) {

            console.log(
                error.response?.data
            );

            alert(
                JSON.stringify(
                    error.response?.data,
                    null,
                    2
                )
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-container">

            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >

                <h2>
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                        setPassword(
                            event.target.value
                        )
                    }
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                        ? "Loading..."
                        : "Login"
                    }
                </button>

            </form>

        </div>
    );
}

export default Login;