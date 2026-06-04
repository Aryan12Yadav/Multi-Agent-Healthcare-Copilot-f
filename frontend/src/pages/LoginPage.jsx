import { useState } from "react";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

                <h1 className="text-4xl font-bold text-center mb-8">

                    Login
                </h1>

                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border p-4 rounded-xl mb-4"
                />

                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full border p-4 rounded-xl mb-6"
                />

                <button className="w-full bg-violet-600 text-white py-4 rounded-xl">

                    Sign In

                </button>

            </div>

        </div>
    );
}

export default LoginPage;