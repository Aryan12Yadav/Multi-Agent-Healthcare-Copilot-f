import {
    useEffect,
    useState
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import api from "../services/apiService";

function PatientProfile() {

    const [loading, setLoading] =
        useState(true);

    const [profile, setProfile] =
        useState({

            possible_conditions: [],

            risk_factors: [],

            health_trends: [],

            recommended_tests: []

        });

    useEffect(() => {
        async function loadProfile() {
            try {
                const response = await api.get("/patient-profile");
                setProfile({
                    possible_conditions: response.data.profile?.possible_conditions || [],
                    risk_factors: response.data.profile?.risk_factors || [],
                    health_trends: response.data.profile?.health_trends || [],
                    recommended_tests: response.data.profile?.recommended_tests || []
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();

    }, []);

    if (loading) {

        return <Loader />;
    }

    return (

        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-container">

                    <div className="patient-header">

                        <h2>

                            Patient Health Insights

                        </h2>

                        <p>

                            AI generated insights from all uploaded medical reports

                        </p>

                    </div>

                    <div className="row g-4">

                        <div className="col-lg-3">

                            <div className="patient-card">

                                <h4>

                                    Possible Conditions

                                </h4>

                                <hr />

                                {
                                    profile.possible_conditions.length > 0
                                    ?
                                    (
                                        <ul className="patient-list">

                                            {
                                                profile
                                                .possible_conditions
                                                .map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                        >

                                                            {item}

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>
                                    )
                                    :
                                    (
                                        <p className="empty-text">

                                            No conditions identified.

                                        </p>
                                    )
                                }

                            </div>

                        </div>

                        <div className="col-lg-3">

                            <div className="patient-card">

                                <h4>

                                    Risk Factors

                                </h4>

                                <hr />

                                {
                                    profile.risk_factors.length > 0
                                    ?
                                    (
                                        <ul className="patient-list">

                                            {
                                                profile
                                                .risk_factors
                                                .map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                        >

                                                            {item}

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>
                                    )
                                    :
                                    (
                                        <p className="empty-text">

                                            No risk factors identified.

                                        </p>
                                    )
                                }

                            </div>

                        </div>

                        <div className="col-lg-3">

                            <div className="patient-card">

                                <h4>

                                    Health Trends

                                </h4>

                                <hr />

                                {
                                    profile.health_trends.length > 0
                                    ?
                                    (
                                        <ul className="patient-list">

                                            {
                                                profile
                                                .health_trends
                                                .map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                        >

                                                            {item}

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>
                                    )
                                    :
                                    (
                                        <p className="empty-text">

                                            No health trends available.

                                        </p>
                                    )
                                }

                            </div>

                        </div>

                        <div className="col-lg-3">

                            <div className="patient-card">

                                <h4>

                                    Recommended Tests

                                </h4>

                                <hr />

                                {
                                    profile.recommended_tests.length > 0
                                    ?
                                    (
                                        <ul className="patient-list">

                                            {
                                                profile
                                                .recommended_tests
                                                .map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                        >

                                                            {item}

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>
                                    )
                                    :
                                    (
                                        <p className="empty-text">

                                            No recommendations available.

                                        </p>
                                    )
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default PatientProfile;