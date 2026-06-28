import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/?auth=required" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;