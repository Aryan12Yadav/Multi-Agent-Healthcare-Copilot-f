import {
    apiGet,
    apiPost
} from "./api";

export const getProfile = async() => {

    return await apiGet(
        "/auth/profile"
    );
};

export const updateProfile = async(payload) => {

    return await apiPost(
        "/auth/profile",
        payload
    );
};

export const getDashboardStats = async() => {

    return await apiGet(
        "/dashboard"
    );
};