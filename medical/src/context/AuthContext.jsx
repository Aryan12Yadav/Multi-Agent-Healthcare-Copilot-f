import {
    createContext,
    useState
} from "react";

export const AuthContext =
    createContext();

function AuthProvider({ children }) {

    const [user, setUser] =
        useState(null);

    function login(data) {

        localStorage.setItem(
            "token",
            data.token
        );

        setUser(data);
    }

    function logout() {

        localStorage.removeItem(
            "token"
        );

        setUser(null);
    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export default AuthProvider;