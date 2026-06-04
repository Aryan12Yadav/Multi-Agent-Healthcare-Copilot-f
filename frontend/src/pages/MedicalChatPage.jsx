import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { sendMessage } from "../services/chatService";

function MedicalChatPage() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async() => {

        if (!question.trim()) return;

        const userMessage = {
            sender: "user",
            message: question
        };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await sendMessage(question);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    message: response.response
                }
            ]);

            setQuestion("");

        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <DashboardLayout>

            <div className="p-8 h-screen flex flex-col">

                <h1 className="text-3xl font-bold mb-6">
                    Medical AI Assistant
                </h1>

                <div className="flex-1 overflow-y-auto border rounded-xl bg-white p-4">

                    {
                        messages.map((item, index) => (
                            <div
                                key={index}
                                className={`mb-4 flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-xl p-3 rounded-xl ${item.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                                    {item.message}
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className="mt-4 flex gap-3">

                    <input
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        placeholder="Ask medical question..."
                        className="flex-1 border rounded-xl px-4 py-3"
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 rounded-xl"
                    >
                        Send
                    </button>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default MedicalChatPage;