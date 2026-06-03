import { useState } from "react";

import { uploadReport } from "../services/reportService";


function UploadReportPage() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState(null);

    const handleUpload = async() => {

        if (!file) {

            alert("Select file first");

            return;
        }

        try {

            setLoading(true);

            const result = await uploadReport(file);

            setResponse(result);

        } catch(error) {

            console.log(error);

            alert("Upload failed");
        }

        finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h1>
                Upload Medical Report
            </h1>

            <input
                type="file"
                onChange={(e) => {
                    setFile(
                        e.target.files[0]
                    );
                }}
            />

            <button onClick={handleUpload}>

                Upload

            </button>

            {
                loading && (

                    <p>
                        Uploading...
                    </p>
                )
            }

            {
                response && (

                    <pre>

                        {
                            JSON.stringify(
                                response,
                                null,
                                4
                            )
                        }

                    </pre>
                )
            }

        </div>
    );
}

export default UploadReportPage;