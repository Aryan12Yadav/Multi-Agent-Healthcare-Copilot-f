from app.models.health_trend import HealthTrend


class HealthTrendRepository:

    def __init__(self, db):

        self.db = db

    def create(self, trend):

        self.db.add(trend)

        self.db.commit()

        self.db.refresh(trend)

        return trend

    def get_parameter_history(self, patient_id, parameter):

        return self.db.query(
            HealthTrend
        ).filter(
            HealthTrend.patient_id == patient_id,
            HealthTrend.parameter_name == parameter
        ).order_by(
            HealthTrend.created_at.asc()
        ).all()