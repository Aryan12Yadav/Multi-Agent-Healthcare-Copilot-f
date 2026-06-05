import { useNavigate } from "react-router-dom";

import {
    logoutUser,
    isAuthenticated
} from "../services/auth";

function useAuth() {

    const navigate = useNavigate();

    const logout = () => {

        logoutUser();

        navigate(
            "/login"
        );
    };

    return {
        logout,
        isAuthenticated
    };
}

export default useAuth;