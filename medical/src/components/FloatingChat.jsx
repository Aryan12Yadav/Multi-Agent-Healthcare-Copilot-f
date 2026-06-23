import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import api from "../services/apiService";

function FloatingChat() {

    const [isOpen, setIsOpen] =
        useState(false);

    const [question, setQuestion] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [messages, setMessages] =
        useState([]);

    const chatEndRef =
        useRef(null);

    function getCurrentTime() {

        return new Date()
            .toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );
    }

    useEffect(() => {
        async function loadHistory() {
            try {
                const response = await api.get("/chat/history");
                const history = response.data.messages || [];
                const formattedMessages = [];
                history.forEach((item) => {
                    formattedMessages.push({
                        role: "user",
                        text: item.question,
                        time: getCurrentTime()
                    });
                    formattedMessages.push({
                        role: "assistant",
                        text: item.answer,
                        time: getCurrentTime()
                    });
                });
                setMessages(formattedMessages);
            } catch (error) {
                console.log(error);
            }
        }

        if (isOpen) {
            loadHistory();
        }

    }, [isOpen]);

    useEffect(() => {
        function scrollToBottom() {
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }

        scrollToBottom();

    }, [messages]);

    async function sendMessage() {

        if (
            !question.trim()
        ) {

            return;
        }

        if (loading) {

            return;
        }

        const currentQuestion =
            question.trim();

        setMessages(
            (prev) => [
                ...prev,
                {
                    role: "user",
                    text: currentQuestion,
                    time: getCurrentTime()
                }
            ]
        );

        setQuestion("");

        setLoading(true);

        try {

            const response =
                await api.post(
                    "/chat",
                    null,
                    {
                        params: {
                            question:
                            currentQuestion
                        }
                    }
                );

            setMessages(
                (prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        text:
                        response.data.answer,
                        time:
                        getCurrentTime()
                    }
                ]
            );

        } catch (error) {

            console.log(error);

            setMessages(
                (prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        text:
                        "Unable to connect with MedSphere AI.",
                        time:
                        getCurrentTime()
                    }
                ]
            );

        } finally {

            setLoading(false);
        }
    }

    function clearChat() {

        setMessages([]);
    }

    return (

        <>

            <button
                className="floating-ai"
                onClick={() =>
                    setIsOpen(
                        !isOpen
                    )
                }
            >

                <div className="medai-core">

                    <i className="bi bi-robot"></i>

                </div>

                <span>

                    MedAI

                </span>

            </button>

            {
                isOpen && (

                    <div
                        className="medai-chat-window"
                    >

                        <div
                            className="medai-chat-header"
                        >

                            <div>

                                <h5>
                                    MedSphere AI
                                </h5>

                                <small>
                                    Healthcare Assistant
                                </small>

                            </div>

                            <div>

                                <button
                                    className="clear-btn"
                                    onClick={
                                        clearChat
                                    }
                                >
                                    Clear
                                </button>

                                <button
                                    className="close-btn"
                                    onClick={() =>
                                        setIsOpen(
                                            false
                                        )
                                    }
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                        <div
                            className="medai-chat-body"
                        >

                            {
                                messages.length === 0 && (

                                    <div
                                        className="welcome-box"
                                    >

                                        <h6>
                                            Welcome
                                        </h6>

                                        <p>
                                            Ask questions about reports,
                                            findings, health scores
                                            and analysis.
                                        </p>

                                    </div>

                                )
                            }

                                                        {
                                messages.map(
                                    (
                                        message,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className={
                                                message.role === "user"
                                                ?
                                                "user-message"
                                                :
                                                "bot-message"
                                            }
                                        >

                                            <div
                                                className={
                                                    message.role === "user"
                                                    ?
                                                    "user-bubble"
                                                    :
                                                    "bot-bubble"
                                                }
                                            >

                                                {
                                                    message.text
                                                }

                                            </div>

                                            <small>

                                                {
                                                    message.time
                                                }

                                            </small>

                                        </div>

                                    )
                                )
                            }

                            {
                                loading && (

                                    <div
                                        className="bot-message"
                                    >

                                        <div
                                            className="bot-bubble"
                                        >

                                            MedAI is thinking...

                                        </div>

                                    </div>

                                )
                            }

                            <div
                                ref={
                                    chatEndRef
                                }
                            />

                        </div>

                        <div
                            className="medai-chat-footer"
                        >

                            <input
                                type="text"
                                value={question}
                                disabled={
                                    loading
                                }
                                placeholder={
                                    loading
                                    ?
                                    "Waiting for response..."
                                    :
                                    "Ask MedSphere AI..."
                                }
                                onChange={
                                    (e) =>
                                    setQuestion(
                                        e.target.value
                                    )
                                }
                                onKeyDown={
                                    (e) => {

                                        if (
                                            e.key === "Enter"
                                            &&
                                            !loading
                                        ) {

                                            sendMessage();
                                        }
                                    }
                                }
                            />

                            <button
                                disabled={
                                    loading
                                }
                                onClick={
                                    sendMessage
                                }
                            >

                                {
                                    loading
                                    ?
                                    "..."
                                    :
                                    "Send"
                                }

                            </button>

                        </div>

                    </div>

                )
            }

        </>

    );
}

export default FloatingChat;