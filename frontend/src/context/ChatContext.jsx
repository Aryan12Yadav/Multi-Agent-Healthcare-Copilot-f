import { createContext } from "react";
import { useState } from "react";

export const ChatContext = createContext();

function ChatProvider({
    children
}) {

    const [messages, setMessages] = useState([]);

    const [activeAgent, setActiveAgent] =
        useState("medical");

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                activeAgent,
                setActiveAgent
            }}
        >

            {children}

        </ChatContext.Provider>
    );
}

export default ChatProvider;