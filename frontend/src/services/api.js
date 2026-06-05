const BASE_URL =
    "http://127.0.0.1:8000/api/v1";

async function handleResponse(
    response
) {

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data?.message ||
            "Request Failed"
        );
    }

    return data;
}

export async function apiGet(
    endpoint
) {

    const response =
        await fetch(
            `${BASE_URL}${endpoint}`
        );

    return handleResponse(
        response
    );
}

export async function apiPost(
    endpoint,
    payload
) {

    const response =
        await fetch(
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

    return handleResponse(
        response
    );
}

export async function apiUpload(
    endpoint,
    formData
) {

    const response =
        await fetch(
            `${BASE_URL}${endpoint}`,
            {
                method: "POST",
                body: formData
            }
        );

    return handleResponse(
        response
    );
}