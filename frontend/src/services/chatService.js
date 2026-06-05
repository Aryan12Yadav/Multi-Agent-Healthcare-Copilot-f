import { apiPost } from "./api";

export const askMedicalAgent = async(question, reportId = null) => {

    return await apiPost(
        "/chat",
        {
            question,
            report_id: reportId
        }
    );
};

export const askHospitalAgent = async(question) => {

    return await apiPost(
        "/hospital/search",
        {
            question
        }
    );
};

export const askPharmacyAgent = async(question) => {

    return await apiPost(
        "/pharmacy/search",
        {
            question
        }
    );
};

export const askCostAgent = async(question) => {

    return await apiPost(
        "/cost",
        {
            question
        }
    );
};

export const askFollowupAgent = async(question) => {

    return await apiPost(
        "/followup",
        {
            question
        }
    );
};

export const askTrendAgent = async(question) => {

    return await apiPost(
        "/trends",
        {
            question
        }
    );
};