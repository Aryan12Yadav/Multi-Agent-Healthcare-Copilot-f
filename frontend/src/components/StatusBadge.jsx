function StatusBadge({
    status
}) {

    const styles = {
        completed:
            "bg-green-100 text-green-700 border border-green-200",
        pending:
            "bg-yellow-100 text-yellow-700 border border-yellow-200",
        failed:
            "bg-red-100 text-red-700 border border-red-200",
        active:
            "bg-blue-100 text-blue-700 border border-blue-200"
    };

    return (
        <span
            className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${
                styles[
                    status?.toLowerCase()
                ] ||
                "bg-slate-100 text-slate-700 border border-slate-200"
            }`}
        >

            {status}

        </span>
    );
}

export default StatusBadge;