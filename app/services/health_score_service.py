
class HealthScoreService:

    def calculate(
        self,
        analysis
    ):

        if not analysis.get(
            "is_medical_report",
            False
        ):

            return {
                "health_score": 0,
                "risk_level": "Not Applicable",
                "score_breakdown": {}
            }

        score = 100

        critical_findings = len(
            analysis.get(
                "critical_findings",
                []
            )
        )

        abnormal_findings = len(
            analysis.get(
                "abnormal_findings",
                []
            )
        )

        diagnoses = len(
            analysis.get(
                "diagnoses",
                []
            )
        )

        medications = len(
            analysis.get(
                "medications",
                []
            )
        )

        score -= (
            critical_findings * 20
        )

        score -= (
            abnormal_findings * 5
        )

        score -= (
            diagnoses * 2
        )

        score -= (
            medications * 1
        )

        score = max(
            min(score, 100),
            0
        )

        risk_level = self.get_risk_level(
            score
        )

        return {

            "health_score":
                score,

            "risk_level":
                risk_level,

            "score_breakdown": {

                "critical_findings":
                    critical_findings,

                "abnormal_findings":
                    abnormal_findings,

                "diagnoses":
                    diagnoses,

                "medications":
                    medications
            }
        }

    def get_risk_level(
        self,
        score
    ):

        if score >= 90:

            return "Excellent"

        if score >= 75:

            return "Low"

        if score >= 60:

            return "Medium"

        if score >= 40:

            return "High"

        return "Critical"
