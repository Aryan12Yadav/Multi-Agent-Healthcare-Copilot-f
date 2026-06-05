const BASE_URL =
    "http://127.0.0.1:8000/api/v1";

export async function apiGet(
    endpoint
) {

    const response = await fetch(
        `${BASE_URL}${endpoint}`
    );

    return await response.json();
}

export async function apiPost(
    endpoint,
    payload
) {

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(
                payload
            )
        }
    );

    return await response.json();
}

export async function apiUpload(
    endpoint,
    formData
) {

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            method: "POST",
            body: formData
        }
    );

    return await response.json();
}