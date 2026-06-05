function ChatBubble({
    sender,
    message
}) {

    const isUser =
        sender === "user";

    return (
        <div
            className={`flex mb-6 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-[75%] ${
                    isUser
                        ? "items-end"
                        : "items-start"
                } flex flex-col`}
            >

                <div
                    className={`px-6 py-4 rounded-[24px] shadow-sm ${
                        isUser
                            ? "bg-violet-600 text-white"
                            : "bg-white border border-slate-200"
                    }`}
                >

                    <p className="leading-8 whitespace-pre-wrap break-words">

                        {message}

                    </p>

                </div>

            </div>

        </div>
    );
}

export default ChatBubble;