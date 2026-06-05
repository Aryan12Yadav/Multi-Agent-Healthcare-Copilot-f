const BASE_URL =
    "http://127.0.0.1:8000/api/v1";

const getHeaders = () => {

    const token = localStorage.getItem(
        "access_token"
    );

    return {
        "Content-Type": "application/json",
        Authorization: token
            ? `Bearer ${token}`
            : ""
    };
};

export const apiGet = async(endpoint) => {

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            method: "GET",
            headers: getHeaders()
        }
    );

    if (!response.ok) {

        throw new Error(
            "API Request Failed"
        );
    }

    return await response.json();
};

export const apiPost = async(
    endpoint,
    payload
) => {

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(
                payload
            )
        }
    );

    if (!response.ok) {

        throw new Error(
            "API Request Failed"
        );
    }

    return await response.json();
};

export const apiUpload = async(
    endpoint,
    formData
) => {

    const token = localStorage.getItem(
        "access_token"
    );

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            method: "POST",
            headers: {
                Authorization: token
                    ? `Bearer ${token}`
                    : ""
            },
            body: formData
        }
    );

    if (!response.ok) {

        throw new Error(
            "Upload Failed"
        );
    }

    return await response.json();
};