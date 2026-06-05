import { apiGet } from "./api";

export const getDashboardData = async() => {

    return await apiGet(
        "/dashboard"
    );
};

export const getRecentReports = async() => {

    const response = await apiGet(
        "/dashboard"
    );

    return response.recent_reports || [];
};

export const getHealthScore = async() => {

    const response = await apiGet(
        "/dashboard"
    );

    return response.health_score || 0;
};

export const getInsights = async() => {

    const response = await apiGet(
        "/dashboard"
    );

    return response.latest_insights || [];
};