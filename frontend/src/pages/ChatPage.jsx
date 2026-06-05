import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatBubble from "../components/ChatBubble";

import {
    askMedicalAgent,
    askHospitalAgent,
    askPharmacyAgent,
    askTrendAgent,
    askFollowupAgent,
    askCostAgent
} from "../services/chatService";

function ChatPage() {

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [activeAgent, setActiveAgent] = useState("medical");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            message:
                "Welcome to MedSphere AI. Upload a report or ask any healthcare related question."
        }
    ]);

    const getAgentResponse = async() => {

        if (activeAgent === "medical") {

            return await askMedicalAgent(
                question
            );
        }

        if (activeAgent === "hospital") {

            return await askHospitalAgent(
                question
            );
        }

        if (activeAgent === "pharmacy") {

            return await askPharmacyAgent(
                question
            );
        }

        if (activeAgent === "trend") {

            return await askTrendAgent(
                question
            );
        }

        if (activeAgent === "followup") {

            return await askFollowupAgent(
                question
            );
        }

        return await askCostAgent(
            question
        );
    };

    const sendMessage = async() => {

        if (!question.trim()) {

            return;
        }

        const currentQuestion = question;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                message: currentQuestion
            }
        ]);

        setQuestion("");

        try {

            setLoading(true);

            const response = await getAgentResponse();

            let aiResponse = "";

            if (typeof response === "string") {

                aiResponse = response;

            } else {

                aiResponse =
                    response.answer ||
                    response.response ||
                    response.message ||
                    JSON.stringify(
                        response,
                        null,
                        2
                    );
            }

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    message: aiResponse
                }
            ]);

        } catch(error) {

            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    message:
                        "Unable to connect with the AI service. Please verify backend APIs are running and endpoint URLs match your FastAPI routes."
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

                <div className="p-6 lg:p-8 flex-1 flex flex-col">

                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <h1 className="text-4xl font-bold">

                            Medical AI Assistant

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Multi-Agent Healthcare System
                        </p>

                        <div className="grid lg:grid-cols-6 gap-3 mt-6">

                            <button
                                onClick={() => setActiveAgent("medical")}
                                className={`h-12 rounded-2xl font-medium ${
                                    activeAgent === "medical"
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100"
                                }`}
                            >

                                Medical

                            </button>

                            <button
                                onClick={() => setActiveAgent("hospital")}
                                className={`h-12 rounded-2xl font-medium ${
                                    activeAgent === "hospital"
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100"
                                }`}
                            >

                                Hospital

                            </button>

                            <button
                                onClick={() => setActiveAgent("pharmacy")}
                                className={`h-12 rounded-2xl font-medium ${
                                    activeAgent === "pharmacy"
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100"
                                }`}
                            >

                                Pharmacy

                            </button>

                            <button
                                onClick={() => setActiveAgent("trend")}
                                className={`h-12 rounded-2xl font-medium ${
                                    activeAgent === "trend"
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100"
                                }`}
                            >

                                Trends

                            </button>

                            <button
                                onClick={() => setActiveAgent("followup")}
                                className={`h-12 rounded-2xl font-medium ${
                                    activeAgent === "followup"
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100"
                                }`}
                            >

                                Follow Up

                            </button>

                            <button
                                onClick={() => setActiveAgent("cost")}
                                className={`h-12 rounded-2xl font-medium ${
                                    activeAgent === "cost"
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100"
                                }`}
                            >

                                Cost

                            </button>

                        </div>

                    </div>

                    <div className="flex-1 bg-white rounded-[32px] shadow-sm mt-6 p-6 overflow-y-auto min-h-[500px]">

                        {
                            messages.map((message, index) => (

                                <ChatBubble
                                    key={index}
                                    sender={message.sender}
                                    message={message.message}
                                />

                            ))
                        }

                        {
                            loading && (

                                <div className="mt-6">

                                    <div className="bg-slate-100 p-4 rounded-2xl w-fit">

                                        AI is analyzing...

                                    </div>

                                </div>

                            )
                        }

                    </div>

                    <div className="bg-white rounded-[32px] shadow-sm p-4 mt-6">

                        <div className="flex gap-4">

                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {

                                        sendMessage();
                                    }
                                }}
                                placeholder="Ask about symptoms, reports, medicines, hospitals..."
                                className="flex-1 h-14 border border-slate-300 rounded-2xl px-5"
                            />

                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-10 rounded-2xl font-semibold"
                            >

                                Send

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ChatPage;