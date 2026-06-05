import {
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Reports from "../pages/Reports";
import UploadReport from "../pages/UploadReport";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/reports"
                element={<Reports />}
            />

            <Route
                path="/upload"
                element={<UploadReport />}
            />

            <Route
                path="/chat"
                element={<Chat />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

        </Routes>

    );
}

export default AppRoutes;