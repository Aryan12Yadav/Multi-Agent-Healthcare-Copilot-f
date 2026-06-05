function SecondaryButton({
    text,
    onClick,
    disabled = false,
    className = "",
    type = "button"
}) {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`h-14 px-8 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-700 rounded-2xl font-semibold transition-all border border-slate-200 ${className}`}
        >

            {text}

        </button>
    );
}

export default SecondaryButton;