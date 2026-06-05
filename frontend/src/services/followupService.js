import { apiPost } from "./api";

export const getFollowupPlan = async(
    question
) => {

    return await apiPost(
        "/followup",
        {
            question
        }
    );
};