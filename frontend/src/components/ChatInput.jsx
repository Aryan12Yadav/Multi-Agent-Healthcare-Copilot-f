import { useState } from "react";

function ChatInput({ onSend }) {

    const [question, setQuestion] = useState("");

    const handleSubmit = () => {

        if (!question.trim()) return;

        onSend(question);

        setQuestion("");
    };

    return (

        <div className="bg-white border rounded-2xl p-4 flex gap-4">

            <input
                type="text"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ask any medical question..."
                className="flex-1 outline-none"
            />

            <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl"
            >

                Send

            </button>

        </div>
    );
}

export default ChatInput;