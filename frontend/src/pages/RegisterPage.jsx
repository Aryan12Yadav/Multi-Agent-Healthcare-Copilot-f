import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";

import { registerUser } from "../services/auth";

function RegisterPage() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleRegister = async() => {

        setError("");

        if (!fullName.trim()) {

            setError(
                "Full name is required"
            );

            return;
        }

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

        if (password !== confirmPassword) {

            setError(
                "Passwords do not match"
            );

            return;
        }

        try {

            setLoading(true);

            await registerUser(
                fullName,
                email,
                password
            );

            navigate(
                "/login"
            );

        } catch(error) {

            console.log(error);

            setError(
                "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <AuthLayout>

            <div className="bg-white rounded-[40px] shadow-xl p-10 border border-slate-200">

                <div className="text-center">

                    <h1 className="text-5xl font-bold text-slate-900">

                        Create Account

                    </h1>

                    <p className="text-slate-500 mt-4 text-lg">

                        Join MedSphere AI Healthcare Platform

                    </p>

                </div>

                {
                    error && (

                        <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl">

                            {error}

                        </div>

                    )
                }

                <div className="mt-8">

                    <label className="block mb-2 font-medium">

                        Full Name

                    </label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full h-14 border border-slate-300 rounded-2xl px-5"
                    />

                </div>

                <div className="mt-5">

                    <label className="block mb-2 font-medium">

                        Email

                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full h-14 border border-slate-300 rounded-2xl px-5"
                    />

                </div>

                <div className="mt-5">

                    <label className="block mb-2 font-medium">

                        Password

                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Create password"
                        className="w-full h-14 border border-slate-300 rounded-2xl px-5"
                    />

                </div>

                <div className="mt-5">

                    <label className="block mb-2 font-medium">

                        Confirm Password

                    </label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full h-14 border border-slate-300 rounded-2xl px-5"
                    />

                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl mt-8 font-semibold"
                >

                    {
                        loading
                            ? "Creating Account..."
                            : "Create Account"
                    }

                </button>

                <div className="mt-8 text-center">

                    <p className="text-slate-500">

                        Already have an account?

                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-3 text-violet-600 font-semibold"
                    >

                        Login Here

                    </button>

                </div>

            </div>

        </AuthLayout>
    );
}

export default RegisterPage;