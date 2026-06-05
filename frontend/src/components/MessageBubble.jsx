function MessageBubble({
    role,
    content
}) {

    return (

        <div
            className={
                role === "user"
                ? "message-user"
                : "message-ai"
            }
        >

            {content}

        </div>

    );
}

export default MessageBubble;