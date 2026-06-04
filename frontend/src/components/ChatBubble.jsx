function ChatBubble({ sender, message }) {

    const isUser = sender === "user";

    return (
        <div
            className={`flex mb-6 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`flex items-start gap-4 max-w-[75%] ${
                    isUser
                        ? "flex-row-reverse"
                        : ""
                }`}
            >

                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        isUser
                            ? "bg-violet-600"
                            : "bg-slate-700"
                    }`}
                >

                    {
                        isUser
                            ? "A"
                            : "AI"
                    }

                </div>

                <div>

                    <div
                        className={`px-6 py-4 rounded-3xl shadow-sm ${
                            isUser
                                ? "bg-violet-600 text-white"
                                : "bg-white border border-slate-200 text-slate-800"
                        }`}
                    >

                        <p className="leading-8 whitespace-pre-wrap break-words">

                            {message}

                        </p>

                    </div>

                    <p
                        className={`text-xs text-slate-400 mt-2 ${
                            isUser
                                ? "text-right"
                                : "text-left"
                        }`}
                    >

                        {
                            new Date().toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            )
                        }

                    </p>

                </div>

            </div>

        </div>
    );
}

export default ChatBubble;