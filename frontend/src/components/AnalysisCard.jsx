import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

import { sendMessage } from "../services/chatService";
import { getHistory } from "../services/chatService";

function MedicalChatPage() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async() => {

        try {

            const response = await getHistory();

            const formatted = response.map(item => ({
                sender: item.role === "assistant" ? "ai" : "user",
                message: item.message
            }));

            setMessages(formatted);

        } catch(error) {

            console.log(error);
        }
    };

    const handleSend = async(question) => {

        const userMessage = {
            sender: "user",
            message: question
        };

        setMessages(prev => [...prev, userMessage]);

        try {

            setLoading(true);

            const result = await sendMessage(question);

            const aiMessage = {
                sender: "ai",
                message: result.response || "No response"
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Medical Chat
                </h1>

                <div className="bg-gray-100 rounded-xl p-6 h-[500px] overflow-y-auto space-y-4">

                    {messages.map((item, index) => (
                        <ChatBubble
                            key={index}
                            sender={item.sender}
                            message={item.message}
                        />
                    ))}

                    {loading && (
                        <ChatBubble
                            sender="ai"
                            message="Thinking..."
                        />
                    )}

                </div>

                <div className="flex gap-3 mb-4">

                    <button
                        onClick={() => handleSend("What is diabetes?")}
                    >
                        Diabetes
                    </button>

                    <button
                        onClick={() => handleSend("Explain my report")}
                    >
                        Explain Report
                    </button>

                    <button
                        onClick={() => handleSend("What is an X-Ray?")}
                    >
                        X-Ray
                    </button>

                </div>

                <div className="mt-4">

                    <ChatInput onSend={handleSend} />

                </div>

            </div>

        </DashboardLayout>
    );
}

export default MedicalChatPage;