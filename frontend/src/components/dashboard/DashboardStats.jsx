function DashboardStats({ metrics }) {

    const cards = [
        {
            title: "Reports",
            value: metrics?.report_count || 0
        },
        {
            title: "Analysis",
            value: metrics?.analysis_count || 0
        },
        {
            title: "Chats",
            value: metrics?.chat_count || 0
        },
        {
            title: "Health Score",
            value: metrics?.health_score || 78
        }
    ];

    return (

        <div className="grid grid-cols-4 gap-6">

            {
                cards.map(card => (

                    <div
                        key={card.title}
                        className="bg-white rounded-3xl shadow p-6"
                    >

                        <p className="text-gray-500">

                            {card.title}

                        </p>

                        <h1 className="text-4xl font-bold mt-3">

                            {card.value}

                        </h1>

                    </div>
                ))
            }

        </div>
    );
}

export default DashboardStats;