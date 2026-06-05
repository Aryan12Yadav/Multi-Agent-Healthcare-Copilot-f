import { useState } from "react";

function FloatingAssistant() {

    const [open, setOpen] =
        useState(false);

    return (

        <>

            <button
                className="ai-float-button"
                onClick={() =>
                    setOpen(!open)
                }
            >
                MedAI
            </button>

            {
                open && (

                    <div
                        className="ai-chat-window"
                    >

                        <div
                            className="ai-chat-header"
                        >

                            <h3>
                                MedSphere AI
                            </h3>

                            <button
                                onClick={() =>
                                    setOpen(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <div
                            className="ai-chat-body"
                        >

                            <div
                                className="ai-message"
                            >

                                Hello Aryan,
                                how can I help you today?

                            </div>

                        </div>

                        <div
                            className="ai-chat-footer"
                        >

                            <input
                                placeholder="Ask MedSphere AI..."
                            />

                            <button>
                                Send
                            </button>

                        </div>

                    </div>

                )
            }

        </>

    );
}

export default FloatingAssistant;