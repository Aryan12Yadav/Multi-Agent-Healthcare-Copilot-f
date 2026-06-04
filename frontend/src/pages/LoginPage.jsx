import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";

import { loginUser } from "../services/auth";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleLogin = async() => {

        setError("");

        if (!email.trim()) {

            setError(
                "Email is required"
            );

            return;
        }

        if (!password.trim()) {

            setError(
                "Password is required"
            );

            return;
        }

        try {

            setLoading(true);

            const response = await loginUser(
                email,
                password
            );

            if (!response.access_token) {

                setError(
                    "Invalid credentials"
                );

                return;
            }

            localStorage.setItem(
                "token",
                response.access_token
            );

            if (rememberMe) {

                localStorage.setItem(
                    "remember_email",
                    email
                );
            }

            navigate(
                "/dashboard"
            );

        } catch(error) {

            console.log(error);

            setError(
                "Unable to login"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <AuthLayout>

            <div className="bg-white rounded-[40px] shadow-xl border border-slate-200 p-10">

                <div className="text-center">

                    <h1 className="text-5xl font-bold text-slate-900">

                        Welcome Back

                    </h1>

                    <p className="text-slate-500 mt-4 text-lg">

                        Sign in to access your healthcare dashboard

                    </p>

                </div>

                {
                    error && (

                        <div className="mt-8 bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4">

                            {error}

                        </div>

                    )
                }

                <div className="mt-8">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">

                        Email Address

                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full h-14 border border-slate-300 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                </div>

                <div className="mt-5">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">

                        Password

                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full h-14 border border-slate-300 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                </div>

                <div className="flex items-center justify-between mt-5">

                    <label className="flex items-center gap-3 cursor-pointer">

                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />

                        <span className="text-slate-600">

                            Remember Me

                        </span>

                    </label>

                    <button
                        className="text-violet-600 font-medium"
                    >

                        Forgot Password?

                    </button>

                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl mt-8 font-semibold transition"
                >

                    {
                        loading
                            ? "Signing In..."
                            : "Login"
                    }

                </button>

                <div className="mt-8 text-center">

                    <p className="text-slate-500">

                        Don't have an account?

                    </p>

                    <button
                        onClick={() => navigate("/register")}
                        className="mt-3 text-violet-600 font-semibold"
                    >

                        Create Account

                    </button>

                </div>

            </div>

        </AuthLayout>
    );
}

export default LoginPage;