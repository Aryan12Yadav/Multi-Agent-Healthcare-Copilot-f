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

    return await apiGet(
        "/reports"
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