import { apiPost } from "./api";

export const registerUser = async(
    name,
    email,
    password
) => {

    return await apiPost(
        "/auth/register",
        {
            full_name: name,
            email,
            password
        }
    );
};

export const loginUser = async(
    email,
    password
) => {

    const response = await apiPost(
        "/auth/login",
        {
            email,
            password
        }
    );

    if (response.access_token) {

        localStorage.setItem(
            "access_token",
            response.access_token
        );
    }

    return response;
};

export const logoutUser = () => {

    localStorage.removeItem(
        "access_token"
    );

    window.location.href =
        "/login";
};

export const isAuthenticated = () => {

    return !!localStorage.getItem(
        "access_token"
    );
};