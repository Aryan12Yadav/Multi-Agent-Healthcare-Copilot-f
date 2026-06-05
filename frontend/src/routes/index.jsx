import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import UploadPage from "../pages/UploadPage";
import AnalysisPage from "../pages/AnalysisPage";
import ChatPage from "../pages/ChatPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import ReportDetailsPage from "../pages/ReportDetailsPage";

import { isAuthenticated } from "../services/auth";

function ProtectedRoute({ children }) {

    return isAuthenticated()
        ? children
        : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {

    return isAuthenticated()
        ? <Navigate to="/dashboard" replace />
        : children;
}

function AppRoutes() {

    return (
        <Routes>

            <Route
                path="/"
                element={
                    <PublicRoute>

                        <LandingPage />

                    </PublicRoute>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>

                        <LoginPage />

                    </PublicRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicRoute>

                        <RegisterPage />

                    </PublicRoute>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <DashboardPage />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/upload"
                element={
                    <ProtectedRoute>

                        <UploadPage />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/analysis"
                element={
                    <ProtectedRoute>

                        <AnalysisPage />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>

                        <ChatPage />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>

                        <ProfilePage />

                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>

                        <SettingsPage />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/report/:id"
                element={
                    <ProtectedRoute>

                        <ReportDetailsPage />

                    </ProtectedRoute>
                }
            />
        </Routes>

        
    );
}

export default AppRoutes;