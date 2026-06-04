function ChatBubble({ message, sender }) {

    const isUser = sender === "user";

    return (

        <div
            className={
                `flex ${
                    isUser
                    ? "justify-end"
                    : "justify-start"
                }`
            }
        >

            <div
                className={
                    `
                    max-w-[70%]
                    p-4
                    rounded-xl
                    ${
                        isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white shadow"
                    }
                    `
                }
            >

                {message}

            </div>

        </div>
    );
}

export default ChatBubble;