import { useState } from "react";

import api from "../api/api";

function UploadBox() {

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const uploadFile =
        async () => {

        if (!file) {

            alert(
                "Select file first"
            );

            return;
        }

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        try {

            setLoading(true);

            await api.post(
                "/reports/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                        "multipart/form-data"
                    }
                }
            );

            alert(
                "Report uploaded successfully"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="upload-box">

            <input
                type="file"
                onChange={(event) =>
                    setFile(
                        event.target.files[0]
                    )
                }
            />

            <button
                onClick={uploadFile}
            >

                {
                    loading
                    ? "Uploading..."
                    : "Upload Report"
                }

            </button>

        </div>
    );
}

export default UploadBox;