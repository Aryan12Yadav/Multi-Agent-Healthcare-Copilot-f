import {
    createContext,
    useState
} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const [showAuthModal, setShowAuthModal] = useState(false);

    function login(data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
            id: data.user_id,
            name: data.name,
            email: data.email,
            role: data.role
        }));
        localStorage.setItem("role", data.role);
        
        setToken(data.token);
        setUser({
            id: data.user_id,
            name: data.name,
            email: data.email,
            role: data.role
        });
        setShowAuthModal(false);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                showAuthModal,
                setShowAuthModal
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;