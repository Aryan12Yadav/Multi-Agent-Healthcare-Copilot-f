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

        if (password.length < 6) {

            setError(
                "Password must be at least 6 characters"
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

            <div className="bg-white w-full max-w-md rounded-[40px] shadow-xl p-10">

                <div className="text-center">

                    <h1 className="text-5xl font-bold">

                        Create Account

                    </h1>

                    <p className="text-slate-500 mt-4">

                        Start managing your healthcare with AI

                    </p>

                </div>

                {
                    error && (

                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mt-8">

                            {error}

                        </div>

                    )
                }

                <div className="mt-8">

                    <label className="block mb-2 font-medium">

                        Full Name

                    </label>

                    <input
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full h-14 border rounded-2xl px-5 outline-none"
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
                        placeholder="Enter email"
                        className="w-full h-14 border rounded-2xl px-5 outline-none"
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
                        placeholder="Enter password"
                        className="w-full h-14 border rounded-2xl px-5 outline-none"
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
                        className="w-full h-14 border rounded-2xl px-5 outline-none"
                    />

                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full h-14 bg-violet-600 text-white rounded-2xl mt-8 font-medium"
                >

                    {
                        loading
                            ? "Creating Account..."
                            : "Register"
                    }

                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="w-full h-14 border rounded-2xl mt-4 font-medium"
                >

                    Already Have Account

                </button>

            </div>

        </AuthLayout>
    );
}

export default RegisterPage;