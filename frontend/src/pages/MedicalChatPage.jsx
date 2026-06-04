import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

import { sendMessage } from "../services/chatService";

function MedicalChatPage() {

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            message: "Hello Aryan, how can I help you today?"
        }
    ]);

    const askQuestion = async(question) => {

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                message: question
            }
        ]);

        try {

            const response = await sendMessage(question);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    message: response.response
                }
            ]);

        } catch(error) {

            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <div className="p-8 bg-slate-50 min-h-screen">

                <div className="bg-white rounded-3xl shadow p-8 mb-8">

                    <h1 className="text-4xl font-bold">

                        Medical AI Assistant

                    </h1>

                    <p className="text-slate-500 mt-3">

                        Ask questions about diseases, reports, medicines and healthcare.
                    </p>

                </div>

                <div className="bg-slate-100 rounded-3xl p-6 min-h-[500px] mb-6">

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