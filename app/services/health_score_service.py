class HealthScoreService:

    def calculate(
        self,
        analysis: dict
    ) -> dict:

        if not analysis.get(
            "is_medical_report",
            False
        ):

            return {
                "health_score": 0,
                "risk_level": "Not Applicable"
            }

        score = 100

        critical_count = len(
            analysis.get(
                "critical_findings",
                []
            )
        )

        abnormal_count = len(
            analysis.get(
                "abnormal_findings",
                []
            )
        )

        diagnosis_count = len(
            analysis.get(
                "diagnoses",
                []
            )
        )

        medication_count = len(
            analysis.get(
                "medications",
                []
            )
        )

        score -= (
            critical_count * 20
        )

        score -= (
            abnormal_count * 5
        )

        score -= (
            diagnosis_count * 2
        )

        score -= (
            medication_count * 1
        )

        score = max(
            0,
            min(
                score,
                100
            )
        )

        risk_level = (
            self._get_risk_level(
                score
            )
        )

        return {
            "health_score": score,
            "risk_level": risk_level
        }

    def _get_risk_level(
        self,
        score: int
    ) -> str:

        if score >= 90:
            return "Excellent"

        if score >= 75:
            return "Low"

        if score >= 60:
            return "Medium"

        if score >= 40:
            return "High"

        return "Critical"