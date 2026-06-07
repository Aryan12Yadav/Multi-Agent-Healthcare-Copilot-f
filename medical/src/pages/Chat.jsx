import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import api from "../services/apiService";

function Chat() {

    const [loading, setLoading] =
        useState(true);

    const [sending, setSending] =
        useState(false);

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [userName, setUserName] =
        useState("User");

    const chatEndRef =
        useRef(null);

    const inputRef =
        useRef(null);

    useEffect(() => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "{}"
            );

        if (user?.name) {

            setUserName(
                user.name
            );
        }

        loadHistory();

    }, []);

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    async function loadHistory() {

        try {

            const response =
                await api.get(
                    "/chat/history"
                );

            const history =
                response.data.messages || [];

            const formattedMessages =
                [];

            history.forEach(
                (item) => {

                    formattedMessages.push({
                        role: "user",
                        text: item.question,
                        created_at:
                        item.created_at
                    });

                    formattedMessages.push({
                        role: "assistant",
                        text: item.answer,
                        created_at:
                        item.created_at
                    });

                }
            );

            setMessages(
                formattedMessages
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    async function sendMessage() {

        if (
            !question.trim()
        ) {

            return;
        }

        if (sending) {

            return;
        }

        const currentQuestion =
            question.trim();

        setQuestion("");

        setMessages(
            (prev) => [
                ...prev,
                {
                    role: "user",
                    text: currentQuestion,
                    created_at:
                    new Date()
                }
            ]
        );

        setSending(true);

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
                        created_at:
                        new Date()
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
                        "Unable to connect with MedSphere AI."
                    }
                ]
            );

        } finally {

            setSending(false);

            setTimeout(() => {

                inputRef.current?.focus();

            }, 100);
        }
    }

    function clearChat() {

        setMessages([]);
    }

    function formatTime(value) {

        if (!value) {

            return "";
        }

        return new Date(
            value
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    }

    if (loading) {

        return <Loader />;
    }

    return (

        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-container">

                    <div className="chat-page">

                        <div className="chat-page-header">

                            <div>

                                <h2>

                                    MedSphere AI Assistant

                                </h2>

                                <p>

                                    Welcome,
                                    {" "}
                                    {userName}

                                </p>

                            </div>

                            <button
                                className="btn btn-light"
                                onClick={
                                    clearChat
                                }
                            >

                                Clear Chat

                            </button>

                        </div>

                        <div className="chat-messages">

                            {
                                messages.length === 0 && (

                                    <div
                                        className="welcome-chat"
                                    >

                                        <h4>

                                            Welcome,
                                            {" "}
                                            {userName}

                                        </h4>

                                        <p>

                                            Ask anything about your uploaded reports, findings, health score and medical analysis.

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
                                        >

                                            <div
                                                className={
                                                    message.role === "user"
                                                    ?
                                                    "user-message"
                                                    :
                                                    "ai-message"
                                                }
                                            >

                                                {
                                                    message.text
                                                }

                                            </div>

                                            <small
                                                className="message-time"
                                            >

                                                {
                                                    formatTime(
                                                        message.created_at
                                                    )
                                                }

                                            </small>

                                        </div>

                                    )
                                )
                            }

                            {
                                sending && (

                                    <div
                                        className="ai-message"
                                    >

                                        <div
                                            className="typing-animation"
                                        >

                                            <span></span>
                                            <span></span>
                                            <span></span>

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

                        <div className="chat-input-area">

                            <input
                                ref={inputRef}
                                className="form-control"
                                placeholder="Ask MedSphere AI..."
                                value={question}
                                maxLength={1000}
                                disabled={sending}
                                onChange={
                                    (e) =>
                                    setQuestion(
                                        e.target.value
                                    )
                                }
                                onKeyDown={
                                    (e) =>
                                    e.key === "Enter"
                                    &&
                                    sendMessage()
                                }
                            />

                            <button
                                className="btn btn-primary"
                                onClick={
                                    sendMessage
                                }
                                disabled={
                                    sending
                                }
                            >

                                {
                                    sending
                                    ?
                                    "Sending..."
                                    :
                                    "Send"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Chat;