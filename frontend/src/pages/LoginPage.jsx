import { useState } from "react";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center">

            <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

                <h1 className="text-4xl font-bold mb-8 text-center">

                    Welcome Back

                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border rounded-xl p-4 mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border rounded-xl p-4 mb-6"
                />

                <button
                    className="w-full bg-purple-600 text-white py-4 rounded-xl"
                >

                    Login

                </button>

            </div>

        </div>
    );
}

export default LoginPage;