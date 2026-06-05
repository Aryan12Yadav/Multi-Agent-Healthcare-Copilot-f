import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        full_name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]:
            event.target.value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            await api.post(
                "/auth/register",
                form
            );

            alert(
                "Registration successful"
            );

            navigate("/login");

        } catch (error) {

            alert(
                error?.response?.data?.detail ||
                "Registration failed"
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

                <h1>
                    MedSphere AI
                </h1>

                <h2>
                    Register
                </h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                        ? "Please wait..."
                        : "Create Account"
                    }
                </button>

                <p>

                    Already have account?

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </span>

                </p>

            </form>

        </div>
    );
}

export default Register;