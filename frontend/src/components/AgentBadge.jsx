function AgentBadge({
    agent
}) {

    const styles = {
        medical: "bg-violet-100 text-violet-700",
        hospital: "bg-blue-100 text-blue-700",
        pharmacy: "bg-green-100 text-green-700",
        trend: "bg-orange-100 text-orange-700",
        followup: "bg-pink-100 text-pink-700",
        cost: "bg-red-100 text-red-700"
    };

    return (
        <span
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                styles[agent] || "bg-slate-100 text-slate-700"
            }`}
        >
            {agent?.toUpperCase()}
        </span>
    );
}

export default AgentBadge;