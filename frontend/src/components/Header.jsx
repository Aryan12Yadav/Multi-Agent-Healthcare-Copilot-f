function Header() {

    return (

        <header className="bg-white border-b px-8 py-5">

            <div className="flex justify-between items-center">

                <input
                    type="text"
                    placeholder="Search reports, medicines, diseases..."
                    className="w-96 border rounded-xl px-4 py-3"
                />

                <div className="flex items-center gap-4">

                    <button className="border px-4 py-2 rounded-xl">

                        English
                    </button>

                    <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center">

                        A
                    </div>

                </div>

            </div>

        </header>
    );
}

export default Header;