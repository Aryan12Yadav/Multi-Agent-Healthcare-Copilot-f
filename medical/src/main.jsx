import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./css/global.css";
import "./css/layout.css";
import "./css/sidebar.css";
import "./css/navbar.css";
import "./css/dashboard.css";
import "./css/floating-chat.css";
import "./css/responsive.css";
import "./css/auth.css";
import "./css/reports.css";
import "./css/profile.css";
import "./css/chat.css";
import "./css/upload-report.css";
import "./css/App.css"
import "./css/CompareReports.css";
import "./css/notfound.css";


ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <App />

    </React.StrictMode>

);