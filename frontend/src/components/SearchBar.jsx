function SearchBar({
    value,
    onChange,
    placeholder = "Search..."
}) {

    return (
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-3">

            <input
                value={value}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                placeholder={placeholder}
                className="w-full h-12 outline-none px-4 text-slate-700"
            />

        </div>
    );
}

export default SearchBar;