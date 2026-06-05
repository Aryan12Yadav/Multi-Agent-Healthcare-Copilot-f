import AppRoutes from "./routes";

import AuthProvider from "./context/AuthContext";
import ChatProvider from "./context/ChatContext";

function App() {

    return (
        <AuthProvider>

            <ChatProvider>

                <AppRoutes />

            </ChatProvider>

        </AuthProvider>
    );
}

export default App;