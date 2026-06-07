import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/apiService";

function Auth() {

    const navigate =
        useNavigate();

    const [isLogin, setIsLogin] =
        useState(true);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            password: ""
        });

    useEffect(() => {

            const token =
                localStorage.getItem(
                    "token"
                );

            const role =
                localStorage.getItem(
                    "role"
                );

            if (token) {

                if (
                    role === "admin"
                ) {

                    navigate(
                        "/admin/dashboard"
                    );

                } else {

                    navigate(
                        "/dashboard"
                    );
                }
            }

        }, [navigate]);

    function handleChange(event) {

        setForm({
            ...form,
            [event.target.name]:
            event.target.value
        });
    }

    async function submitForm() {

        setError("");

        setSuccess("");

        if (
            !isLogin &&
            !form.name.trim()
        ) {

            setError(
                "Name is required"
            );

            return;
        }

        if (
            !form.email.trim()
        ) {

            setError(
                "Email is required"
            );

            return;
        }

        if (
            !form.password.trim()
        ) {

            setError(
                "Password is required"
            );

            return;
        }

        setLoading(true);

        try {

            if (isLogin) {

                const response =
                    await api.post(
                        "/auth/login",
                        null,
                        {
                            params: {
                                email:
                                form.email,
                                password:
                                form.password
                            }
                        }
                    );

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        id:
                        response.data.user_id,
                        name:
                        response.data.name,
                        email:
                        response.data.email,
                        role:
                        response.data.role
                    })
                );

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                navigate(
                    "/dashboard"
                );

            } else {

                await api.post(
                    "/auth/register",
                    null,
                    {
                        params: {
                            name:
                            form.name,
                            email:
                            form.email,
                            password:
                            form.password
                        }
                    }
                );

                setSuccess(
                    "Registration Successful. Please Login."
                );

                setForm({
                    name: "",
                    email: "",
                    password: ""
                });

                setIsLogin(
                    true
                );
            }

        } catch (error) {

            console.log(
                error
            );

            setError(
                error?.response?.data?.detail ||
                "Authentication Failed"
            );

        } finally {

            setLoading(false);
        }
    }

        return (

        <div className="auth-wrapper">

            <div className="auth-card">

                <h2>
                    MedSphere AI
                </h2>

                <p>
                    Healthcare Intelligence
                </p>

                {
                    error &&
                    (
                        <div
                            className="auth-error"
                        >
                            {error}
                        </div>
                    )
                }

                {
                    success &&
                    (
                        <div
                            className="auth-success"
                        >
                            {success}
                        </div>
                    )
                }

                {
                    !isLogin && (

                        <input
                            className="form-control mb-3"
                            placeholder="Name"
                            name="name"
                            value={form.name}
                            disabled={loading}
                            onChange={
                                handleChange
                            }
                        />

                    )
                }

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    disabled={loading}
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    disabled={loading}
                    onChange={
                        handleChange
                    }
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter"
                        ) {

                            submitForm();
                        }
                    }}
                />

                <button
                    className="auth-btn"
                    disabled={loading}
                    onClick={
                        submitForm
                    }
                >

                    {
                        loading
                        ?
                        (
                            isLogin
                            ?
                            "Logging In..."
                            :
                            "Registering..."
                        )
                        :
                        (
                            isLogin
                            ? "Login"
                            : "Register"
                        )
                    }

                </button>

                <div
                    className="text-center mt-3"
                >

                    <button
                        className="btn btn-link"
                        disabled={loading}
                        onClick={() => {

                            setError("");

                            setSuccess("");

                            setIsLogin(
                                !isLogin
                            );
                        }}
                    >

                        {
                            isLogin
                            ? "Create Account"
                            : "Already Have Account"
                        }

                    </button>

                </div>

            </div>

        </div>

    );
}

export default Auth;