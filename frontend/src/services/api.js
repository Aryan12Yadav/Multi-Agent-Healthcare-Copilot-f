const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const apiGet = async(endpoint) => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
                    ? `Bearer ${token}`
                    : ""
            }
        }
    );

    return await response.json();
};

export const apiPost = async(endpoint, payload) => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
                    ? `Bearer ${token}`
                    : ""
            },
            body: JSON.stringify(
                payload
            )
        }
    );

    return await response.json();
};

export const apiUpload = async(endpoint, formData) => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
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

    return await response.json();
};

export const apiDelete = async(endpoint) => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            method: "DELETE",
            headers: {
                Authorization: token
                    ? `Bearer ${token}`
                    : ""
            }
        }
    );

    return await response.json();
};