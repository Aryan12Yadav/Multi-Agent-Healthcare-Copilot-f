import { apiPost } from "./api";

export const searchHospitals = async(
    question
) => {

    return await apiPost(
        "/hospital/search",
        {
            question
        }
    );
};