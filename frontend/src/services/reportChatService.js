import api from "../api/axios";

export const askReportQuestion = async(reportId, question) => {

    const response = await api.post(
        "/report-chat",
        {
            report_id: reportId,
            question: question
        }
    );

    return response.data;
};