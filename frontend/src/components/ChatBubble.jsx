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
                className={`max-w-[85%] lg:max-w-[75%] flex flex-col ${
                    isUser
                        ? "items-end"
                        : "items-start"
                }`}
            >

                <span
                    className={`text-xs mb-2 font-medium ${
                        isUser
                            ? "text-violet-600"
                            : "text-slate-500"
                    }`}
                >

                    {
                        isUser
                            ? "You"
                            : "MedSphere AI"
                    }

                </span>

                <div
                    className={`px-6 py-4 rounded-[24px] shadow-sm ${
                        isUser
                            ? "bg-violet-600 text-white"
                            : "bg-white border border-slate-200 text-slate-800"
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