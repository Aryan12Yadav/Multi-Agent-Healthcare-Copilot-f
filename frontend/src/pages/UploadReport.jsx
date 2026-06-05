import Navbar from "../components/Navbar";

import UploadBox from "../components/UploadBox";

function UploadReport() {

    return (

        <div>

            <Navbar />

            <div className="page-container">

                <h1>
                    Upload Medical Report
                </h1>

                <UploadBox />

            </div>

        </div>
    );
}

export default UploadReport;