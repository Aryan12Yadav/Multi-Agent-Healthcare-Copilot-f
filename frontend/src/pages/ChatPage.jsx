import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatBubble from "../components/ChatBubble";

import { apiPost } from "../services/api";

function ChatPage() {

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [activeAgent, setActiveAgent] = useState("medical");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            message: "Welcome Aryan. Select an AI Agent and ask your question."
        }
    ]);

    const sendMessage = async() => {

        if (!question.trim()) {

            return;
        }

        const userMessage = {
            sender: "user",
            message: question
        };

        setMessages(prev => [
            ...prev,
            userMessage
        ]);

        try {

            setLoading(true);

            let endpoint = "/chat";

            if (activeAgent === "hospital") {

                endpoint = "/hospital/search";
            }

            if (activeAgent === "pharmacy") {

                endpoint = "/pharmacy/search";
            }

            if (activeAgent === "trend") {

                endpoint = "/trends";
            }

            if (activeAgent === "followup") {

                endpoint = "/followup";
            }

            if (activeAgent === "cost") {

                endpoint = "/cost";
            }

            const response = await apiPost(
                endpoint,
                {
                    question
                }
            );

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    message:
                        response.response ||
                        response.answer ||
                        JSON.stringify(response)
                }
            ]);

            setQuestion("");

        } catch(error) {

            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    message: "Something went wrong."
                }
            ]);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Header />

                <div className="p-8 flex-1 flex flex-col">

                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <h1 className="text-4xl font-bold">

                            AI Healthcare Assistant
                        </h1>

                        <p className="text-slate-500 mt-2">

                            Medical AI + Hospital + Pharmacy + Cost + Followup + Trends
                        </p>

                        <div className="flex flex-wrap gap-3 mt-6">

                            <button onClick={() => setActiveAgent("medical")} className={`px-5 py-3 rounded-2xl ${activeAgent === "medical" ? "bg-violet-600 text-white" : "bg-slate-100"}`}>

                                Medical AI

                            </button>

                            <button onClick={() => setActiveAgent("hospital")} className={`px-5 py-3 rounded-2xl ${activeAgent === "hospital" ? "bg-violet-600 text-white" : "bg-slate-100"}`}>

                                Hospital

                            </button>

                            <button onClick={() => setActiveAgent("pharmacy")} className={`px-5 py-3 rounded-2xl ${activeAgent === "pharmacy" ? "bg-violet-600 text-white" : "bg-slate-100"}`}>

                                Pharmacy

                            </button>

                            <button onClick={() => setActiveAgent("trend")} className={`px-5 py-3 rounded-2xl ${activeAgent === "trend" ? "bg-violet-600 text-white" : "bg-slate-100"}`}>

                                Trends

                            </button>

                            <button onClick={() => setActiveAgent("followup")} className={`px-5 py-3 rounded-2xl ${activeAgent === "followup" ? "bg-violet-600 text-white" : "bg-slate-100"}`}>

                                Follow-up

                            </button>

                            <button onClick={() => setActiveAgent("cost")} className={`px-5 py-3 rounded-2xl ${activeAgent === "cost" ? "bg-violet-600 text-white" : "bg-slate-100"}`}>

                                Cost Estimator

                            </button>

                        </div>

                    </div>

                    <div className="bg-white rounded-[32px] shadow-sm mt-6 flex-1 overflow-y-auto p-6">

                        {
                            messages.map((message, index) => (

                                <ChatBubble
                                    key={index}
                                    sender={message.sender}
                                    message={message.message}
                                />

                            ))
                        }

                    </div>

                    <div className="bg-white rounded-[32px] p-4 shadow-sm mt-6">

                        <div className="flex gap-4">

                            <input
                                value={question}
                                onChange={e => setQuestion(e.target.value)}
                                placeholder="Ask anything..."
                                className="flex-1 h-14 border rounded-2xl px-5"
                            />

                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className="bg-violet-600 text-white px-8 rounded-2xl"
                            >

                                {
                                    loading
                                        ? "Thinking..."
                                        : "Send"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ChatPage;