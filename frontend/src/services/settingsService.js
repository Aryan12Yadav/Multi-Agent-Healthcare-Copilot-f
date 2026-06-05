import { apiGet, apiPost } from "./api";

export const getSettings = async() => {

    return await apiGet(
        "/settings"
    );
};

export const updateSettings = async(
    payload
) => {

    return await apiPost(
        "/settings",
        payload
    );
};