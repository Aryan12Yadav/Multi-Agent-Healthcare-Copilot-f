function Recommendations({
    recommendations
}) {

    return (

        <div className="recommendations">

            <h2>
                Recommendations
            </h2>

            {
                recommendations?.length
                ? recommendations.map(
                    (
                        item,
                        index
                    ) => (

                        <div
                            key={index}
                            className="recommendation-item"
                        >

                            {item}

                        </div>

                    )
                )
                : (
                    <p>
                        No recommendations available
                    </p>
                )
            }

        </div>
    );
}

export default Recommendations;