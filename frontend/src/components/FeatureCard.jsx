function FeatureCard({ title, description }) {

    return (
        

        <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold">

                {title}

            </h3>

            <p className="mt-3">

                {description}

            </p>

            <div className="grid grid-cols-3 gap-6 mt-20">

            <FeatureCard
                title="Medical Report Analysis"
                description="Understand complex reports in simple language."
            />

            <FeatureCard
                title="AI Medical Chat"
                description="Ask questions about reports and medical terms."
            />

            <FeatureCard
                title="Healthcare Memory"
                description="Track reports and health history over time."
            />

        </div>

        </div>



    );
}

export default FeatureCard;