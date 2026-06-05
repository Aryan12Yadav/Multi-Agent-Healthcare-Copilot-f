function ChatHistorySidebar({
    history = [],
    onSelect
}) {

    return (
        <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto">

            <div className="p-6 border-b">

                <h2 className="text-xl font-bold">

                    Chat History

                </h2>

            </div>

            <div className="p-4">

                {
                    history.length === 0 && (

                        <p className="text-slate-500">

                            No conversations found
                        </p>

                    )
                }

                {
                    history.map((item) => (

                        <button
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="w-full text-left p-4 rounded-2xl hover:bg-slate-100 mb-3"
                        >

                            <p className="font-medium truncate">

                                {item.message}

                            </p>

                            <p className="text-xs text-slate-500 mt-2">

                                {item.role}

                            </p>

                        </button>

                    ))
                }

            </div>

        </div>
    );
}

export default ChatHistorySidebar;