function Header() {

    return (

        <header className="bg-white border-b px-8 py-5">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        MedSphere AI

                    </h2>

                    <p className="text-sm text-slate-500">

                        AI Powered Healthcare Platform

                    </p>

                </div>

                <div className="flex items-center gap-4">

                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-xl px-4 py-2 w-72"
                    />

                    <div className="h-12 w-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                        A

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Header;