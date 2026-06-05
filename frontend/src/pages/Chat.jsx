import Navbar from "../components/Navbar";

import ChatBox from "../components/ChatBox";

function Chat() {

    return (

        <div>

            <Navbar />

            <div
                className="page-container"
            >

                <h1>
                    AI Medical Assistant
                </h1>

                <ChatBox />

            </div>

        </div>
    );
}

export default Chat;