import api from "../api/axios";

export const sendMessage = async(question, reportId = null) => {

    const response = await api.post(
        "/chat",
        {
            question,
            report_id: reportId
        }
    );

    return response.data;
};