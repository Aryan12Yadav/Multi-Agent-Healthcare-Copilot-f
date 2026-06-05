import { apiPost } from "./api";

export const getHealthTrends = async(
    question
) => {

    return await apiPost(
        "/trends",
        {
            question
        }
    );
};