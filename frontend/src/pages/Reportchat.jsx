import {
    useState
} from "react";

import api from "../api/api";

import Sidebar from "../components/Sidebar";

function ReportChat() {

    const [question,
        setQuestion] =
        useState("");

    const [answer,
        setAnswer] =
        useState("");

    const askQuestion =
        async () => {

        try {

            const response =
                await api.post(
                    "/report-chat",
                    {
                        report_id: 1,
                        question
                    }
                );

            setAnswer(
                response.data.answer
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="layout">

            <Sidebar />

            <div className="content">

                <h1>
                    Report Chat
                </h1>

                <input
                    value={question}
                    onChange={
                        (event) =>
                            setQuestion(
                                event.target.value
                            )
                    }
                />

                <button
                    onClick={
                        askQuestion
                    }
                >
                    Ask
                </button>

                <div
                    className="chat-answer"
                >
                    {answer}
                </div>

            </div>

        </div>
    );
}

export default ReportChat;