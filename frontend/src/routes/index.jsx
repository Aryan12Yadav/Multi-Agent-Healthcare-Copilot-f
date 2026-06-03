import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import UploadReportPage from "../pages/UploadReportPage";
import ReportAnalysisPage from "../pages/ReportAnalysisPage";
import MedicalChatPage from "../pages/MedicalChatPage";


function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/upload"
                    element={<UploadReportPage />}
                />

                <Route
                    path="/analysis/:id"
                    element={<ReportAnalysisPage />}
                />

                <Route
                    path="/chat"
                    element={<MedicalChatPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default AppRoutes;