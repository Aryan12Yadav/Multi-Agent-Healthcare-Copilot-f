import {
    apiGet,
    apiUpload
} from "./api";

export const uploadReport = async(
    formData
) => {

    return await apiUpload(
        "/reports/upload",
        formData
    );
};

export const getReports = async() => {

    const response =
        await apiGet(
            "/reports"
        );

    return (
        response?.reports ||
        response?.data ||
        response ||
        []
    );
};

export const getReportDetails = async(
    reportId
) => {

    return await apiGet(
        `/reports/${reportId}`
    );
};

export const getAnalysis = async(
    reportId
) => {

    return await apiGet(
        `/analysis/${reportId}`
    );
};