import { apiPost } from "./api";

export const getTreatmentCost = async(
    question
) => {

    return await apiPost(
        "/cost",
        {
            question
        }
    );
};