import Navbar from "../components/Navbar";

function Profile() {

    const token =
        localStorage.getItem(
            "access_token"
        );

    return (

        <div>

            <Navbar />

            <div
                className="page-container"
            >

                <h1>
                    Profile
                </h1>

                <p>
                    Logged In
                </p>

                <p>
                    Token Available:
                    {" "}
                    {
                        token
                            ? "Yes"
                            : "No"
                    }
                </p>

            </div>

        </div>
    );
}

export default Profile;