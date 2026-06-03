import api from "../api/axios";


export const sendMessage = async(question) => {

    const response = await api.post(
        "/chat",
        {
            question
        }
    );

    return response.data;
};