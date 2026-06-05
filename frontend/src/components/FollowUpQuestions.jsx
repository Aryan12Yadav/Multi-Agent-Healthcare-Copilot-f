function FollowUpQuestions({
    questions
}) {

    return (

        <div className="followup-section">

            <h2>
                Follow Up Questions
            </h2>

            {
                questions?.length
                ? questions.map(
                    (
                        question,
                        index
                    ) => (

                        <div
                            key={index}
                            className="followup-item"
                        >

                            {question}

                        </div>

                    )
                )
                : (
                    <p>
                        No follow-up questions
                    </p>
                )
            }

        </div>
    );
}

export default FollowUpQuestions;