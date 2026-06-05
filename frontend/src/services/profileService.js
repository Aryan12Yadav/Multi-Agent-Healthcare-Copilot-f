import {
    apiGet,
    apiPost
} from "./api";

export const getProfileData = async() => {

    return await apiGet(
        "/auth/profile"
    );
};

export const updateProfileData = async(
    payload
) => {

    return await apiPost(
        "/auth/profile",
        payload
    );
};