import { apiGet } from "./api";

export const getAllAnalysis = async() => {

    return await apiGet(
        "/analysis"
    );
};

export const getAnalysisByReport = async(
    reportId
) => {

    return await apiGet(
        `/analysis/${reportId}`
    );
};