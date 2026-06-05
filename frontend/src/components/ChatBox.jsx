import { useState } from "react";

import api from "../api/api";

function ChatBox() {

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const sendMessage =
        async () => {

        if (!question.trim()) {

            return;
        }

        const userMessage = {
            role: "user",
            content: question
        };

        setMessages(
            previous => [
                ...previous,
                userMessage
            ]
        );

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/chat",
                    {
                        question
                    }
                );

            setMessages(
                previous => [
                    ...previous,
                    {
                        role: "assistant",
                        content:
                            response.data.answer
                            ||
                            response.data.response
                    }
                ]
            );

            setQuestion("");

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="chat-container">

            <div className="chat-messages">

                {
                    messages.map(
                        (
                            message,
                            index
                        ) => (

                            <div
                                key={index}
                                className={
                                    message.role
                                }
                            >

                                {
                                    message.content
                                }

                            </div>

                        )
                    )
                }

            </div>

            <div className="chat-input">

                <input
                    value={question}
                    placeholder="Ask MedSphere AI..."
                    onChange={
                        (event) =>
                            setQuestion(
                                event.target.value
                            )
                    }
                />

                <button
                    onClick={
                        sendMessage
                    }
                >

                    {
                        loading
                        ? "..."
                        : "Send"
                    }

                </button>

            </div>

        </div>
    );
}

export default ChatBox;