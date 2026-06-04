import { apiPost } from "./api";

export const registerUser = async(fullName, email, password) => {

    const response = await apiPost(
        "/auth/register",
        {
            full_name: fullName,
            email,
            password
        }
    );

    return response;
};

export const loginUser = async(email, password) => {

    const response = await apiPost(
        "/auth/login",
        {
            email,
            password
        }
    );

    if (response?.access_token) {

        localStorage.setItem(
            "token",
            response.access_token
        );
    }

    return response;
};

export const logoutUser = () => {

    localStorage.removeItem(
        "token"
    );

    window.location.href = "/login";
};

export const getToken = () => {

    return localStorage.getItem(
        "token"
    );
};

export const isAuthenticated = () => {

    return !!localStorage.getItem(
        "token"
    );
};

export const getAuthHeaders = () => {

    const token = getToken();

    return {
        Authorization: `Bearer ${token}`
    };
};