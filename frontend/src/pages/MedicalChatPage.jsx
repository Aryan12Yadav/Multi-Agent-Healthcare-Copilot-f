import { useState } from "react";

import { sendMessage } from "../services/chatService";


function MedicalChatPage() {

    const [question, setQuestion] = useState("");

    const [response, setResponse] = useState("");

    const handleAsk = async() => {

        try {

            const result = await sendMessage(
                question
            );

            setResponse(
                result.response
            );

        } catch(error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h1>
                Medical Chat
            </h1>

            <input
                type="text"
                value={question}
                onChange={(e) => {
                    setQuestion(
                        e.target.value
                    );
                }}
            />

            <button onClick={handleAsk}>

                Ask

            </button>

            <p>

                {response}

            </p>

        </div>
    );
}

export default MedicalChatPage;