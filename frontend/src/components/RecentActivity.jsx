function RecentActivity({
    activities = []
}) {

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">

                Recent Activity

            </h2>

            <div className="space-y-4">

                {
                    activities.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="flex items-center gap-4 border-b pb-4"
                            >

                                <div className="w-3 h-3 rounded-full bg-violet-600" />

                                <p>

                                    {item}

                                </p>

                            </div>

                        )
                    )
                }

            </div>

        </div>
    );
}

export default RecentActivity;