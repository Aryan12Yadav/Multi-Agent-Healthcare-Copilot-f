function PrimaryButton({
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
            className={`h-14 px-8 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-2xl font-semibold transition-all ${className}`}
        >

            {text}

        </button>
    );
}

export default PrimaryButton;