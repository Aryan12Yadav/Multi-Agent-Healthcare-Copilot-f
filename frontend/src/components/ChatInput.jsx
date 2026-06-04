import { useState } from "react";


function ChatInput({ onSend }) {

    const [message, setMessage] = useState("");

    const handleSend = () => {

        if (!message.trim()) {

            return;
        }

        onSend(message);

        setMessage("");
    };

    return (

        <div className="flex gap-3">

            <input
                type="text"
                value={message}
                placeholder="Ask a medical question..."
                onChange={(e) => {
                    setMessage(
                        e.target.value
                    );
                }}
                className="
                    flex-1
                    border
                    rounded-lg
                    px-4
                    py-3
                "
            />

            <button
                onClick={handleSend}
                className="
                    bg-blue-600
                    text-white
                    px-6
                    rounded-lg
                "
            >

                Send

            </button>

        </div>
    );
}

export default ChatInput;