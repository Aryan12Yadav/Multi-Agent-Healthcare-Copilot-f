import { apiGet } from "./api";

export const getChatHistory = async() => {

    return await apiGet(
        "/chat/history"
    );
};