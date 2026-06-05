import { apiUpload } from "./api";

export const extractText = async(
    formData
) => {

    return await apiUpload(
        "/ocr/extract",
        formData
    );
};