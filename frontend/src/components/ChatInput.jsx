import { useState } from "react";

function ChatInput({
    onSend,
    loading
}) {

    const [message, setMessage] = useState("");

    const handleSend = () => {

        if (!message.trim()) {

            return;
        }

        onSend(
            message
        );

        setMessage("");
    };

    return (
        <div className="bg-white border-t border-slate-200 p-5 rounded-b-[32px]">

            <div className="flex gap-4">

                <input
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" &&
                            !loading
                        ) {

                            handleSend();
                        }
                    }}
                    placeholder="Ask about symptoms, reports, medicines, hospitals..."
                    className="flex-1 h-14 border border-slate-300 rounded-2xl px-5 outline-none focus:border-violet-500"
                />

                <button
                    onClick={handleSend}
                    disabled={
                        loading ||
                        !message.trim()
                    }
                    className="px-8 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-400 text-white rounded-2xl font-semibold transition-all"
                >

                    {
                        loading
                            ? "Sending..."
                            : "Send"
                    }

                </button>

            </div>

        </div>
    );
}

export default ChatInput;