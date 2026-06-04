function QuickMedicalQuestions({ onSelect }) {

    const questions = [
        "What is diabetes?",
        "Explain my blood report",
        "What causes thyroid issues?",
        "How to reduce cholesterol?",
        "Explain my MRI report"
    ];

    return (

        <div className="flex flex-wrap gap-3 mb-6">

            {
                questions.map(question => (

                    <button
                        key={question}
                        onClick={() => onSelect(question)}
                        className="bg-white border px-4 py-2 rounded-full"
                    >

                        {question}

                    </button>
                ))
            }

        </div>
    );
}

export default QuickMedicalQuestions;