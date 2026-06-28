import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import ReportDetails from "./pages/ReportDetails";
import PatientProfile from "./pages/PatientProfile";
import UploadReport from "./pages/UploadReport";
import FloatingChat from "./components/FloatingChat";
import ProtectedRoute from "./components/ProtectedRoute";
import CompareReports from "./pages/CompareReports";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRoute from "./components/AdminRoute";
import AuthModal from "./components/AuthModal";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/report/:id"
                    element={
                        <ProtectedRoute>
                            <ReportDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patient-profile"
                    element={
                        <ProtectedRoute>
                            <PatientProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <UploadReport />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/compare-reports"
                    element={
                        <ProtectedRoute>
                            <CompareReports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>

            {token && <FloatingChat />}
            <AuthModal />
        </BrowserRouter>
    );
}

export default App;