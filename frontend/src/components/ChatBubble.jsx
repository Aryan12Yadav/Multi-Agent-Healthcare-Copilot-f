function ChatBubble({ sender, message }) {

    const isUser = sender === "user";

    return (

        <div className={`flex mb-5 ${isUser ? "justify-end" : "justify-start"}`}>

            <div
                className={`
                    max-w-3xl
                    px-5
                    py-4
                    rounded-2xl
                    shadow
                    ${isUser ? "bg-violet-600 text-white" : "bg-white"}
                `}
            >

                {message}

            </div>

        </div>

    );
}

export default ChatBubble;