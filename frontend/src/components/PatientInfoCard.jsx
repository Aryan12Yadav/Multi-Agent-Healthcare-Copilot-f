function PatientInfoCard({
    patient
}) {

    return (

        <div
            className="patient-info-card"
        >

            <h2>
                Patient Information
            </h2>

            <p>
                Name:
                {" "}
                {patient?.name}
            </p>

            <p>
                Age:
                {" "}
                {patient?.age}
            </p>

            <p>
                Gender:
                {" "}
                {patient?.gender}
            </p>

        </div>
    );
}

export default PatientInfoCard;