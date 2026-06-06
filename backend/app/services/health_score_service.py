class HealthScoreService:

    @staticmethod
    def calculate(findings: list):

        score = 100

        score -= len(findings) * 10

        if score < 0:

            score = 0

        if score >= 80:

            risk = "Low"

        elif score >= 50:

            risk = "Medium"

        else:

            risk = "High"

        return {
            "health_score": score,
            "risk_level": risk
        }