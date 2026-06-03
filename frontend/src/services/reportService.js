import api from "../api/axios";


export const uploadReport = async(file) => {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    const response = await api.post(
        "/reports/upload",
        formData,
        {
            headers: {
                "Content-Type":
                "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const getAnalysis = async(reportId) => {

    const response = await api.get(
        `/reports/${reportId}/analysis`
    );

    return response.data;
};