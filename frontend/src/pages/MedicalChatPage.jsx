import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import QuickMedicalQuestions from "../components/QuickMedicalQuestions";

import { sendMessage } from "../services/chatService";

function MedicalChatPage() {

    const [messages, setMessages] = useState([]);

    const askQuestion = async(question) => {

        const userMessage = {
            sender: "user",
            message: question
        };

        setMessages(prev => [...prev, userMessage]);

        try {

            const response = await sendMessage(question);

            const aiMessage = {
                sender: "ai",
                message: response.response
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch(error) {

            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <div className="p-8 bg-slate-50 min-h-screen">

                <h1 className="text-4xl font-bold mb-2">

                    Medical AI Assistant

                </h1>

                <p className="text-gray-500 mb-8">

                    Ask health related questions instantly
                </p>

                <QuickMedicalQuestions onSelect={askQuestion} />

                <div className="bg-slate-100 rounded-2xl p-6 min-h-[500px] mb-6">

                    {
                        messages.map((item, index) => (

                            <ChatBubble
                                key={index}
                                sender={item.sender}
                                message={item.message}
                            />
                        ))
                    }

                </div>

                <ChatInput onSend={askQuestion} />

            </div>

        </DashboardLayout>
    );
}

export default MedicalChatPage;