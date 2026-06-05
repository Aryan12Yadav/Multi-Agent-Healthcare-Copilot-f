import { apiPost } from "./api";

export const searchPharmacy = async(
    question
) => {

    return await apiPost(
        "/pharmacy/search",
        {
            question
        }
    );
};